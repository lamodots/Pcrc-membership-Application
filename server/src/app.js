require("./cron-jobs/membershipStatusCron");
require("./cron-jobs/welfareStatusCron");
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const fileUpload = require("express-fileupload");
const crypto = require("crypto");
const morgan = require("morgan");
const {
  notfoundHandlerMiddleware,
  errorHandlerMiddleware,
} = require("./middlewares");
const {
  adminAuthRoutes,
  appSettingsRoutes,
  announcementsRoutes,
  subscriptionsRoutes,
  eventRoutes,
  adminUserRoute,
  usersRoutes,
  usersAuthRoutes,
  userDuesRoutes,
  overviewRoutes,
  userProfileRoute,
  memberRegisterRoutes,
} = require("./routes");
const { MembershipDues, WelfareDues } = require("./models");
// const { getExpiryDate } = require("./utils/getExpiryDate");
const { sendEmailSendGridServices } = require("./config");
const { sendPaymentEmailTemplate } = require("./utils/emailTemplate");
const { BadRequestError } = require("./errors");
const { generateReference } = require("./utils");
const getExpiryDate = require("./utils/getExpiryDate");
const sendMailFunc = require("./utils/sendMailFunc");
const adsRoute = require("./routes/admin/advertismentRoutes");

const app = express();
app.disable("etag");
// const corsOptions = { origin: "http://localhost:3000", credentials: true };
// const corsOptions = {
//   origin: ["http://localhost:3000", "https://ksn.membersng.com"],
//   credentials: true,
// };
// //Import exprss middlewares
// app.use(cors(corsOptions));
// const corsOptions = {
//   origin: [
//     "http://localhost:3000",
//     "https://ksn.membersng.com",
//     "https://www.ksn.membersng.com",
//   ],
//   credentials: true,
// };

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://lasppan.membersng.com",
    "https://lasppan-api.membersng.com",
    "https://lasppan-app.onrender.com",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(
  express.static(
    path.join(__dirname, "..", "..", "..", "..", "client", "public", "uploads")
  )
);

// USE V2
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
// app.get("/", (req, res) => {
//   res.send({ message: "Welcome to the MembershipCMS backend API" });
// });
app.use("/api/v1/secure/auth", adminAuthRoutes);
app.use("/api/v1/secure/profile", adminUserRoute);
app.use("/api/v1/secure/settings", appSettingsRoutes);
app.use("/api/v1/secure/announcement", announcementsRoutes);
app.use("/api/v1/secure/subscriptions", subscriptionsRoutes);
app.use("/api/v1/secure/events", eventRoutes);
app.use("/api/v1/secure/users", usersRoutes);
app.use("/api/v1/users/auth", usersAuthRoutes);
app.use("/api/v1/users/profile", userProfileRoute);
app.use("/api/v1/users/membershipdues", userDuesRoutes);
app.use("/api/v1/secure/overview", overviewRoutes);
app.use("/api/v1/secure/advertisment", adsRoute);
app.use("/api/v1/secure/records", memberRegisterRoutes);

//MEMBERSHIPD DUES
app.post("/api/v1/secure/payments", async (req, res, next) => {
  const { userId, email, membershipType, amount, first_name, last_name } =
    req.body;

  try {
    // MAKE A POST REQUEST TO PAYSTACK API to initialize transaction then send access_code to front-end to complete trancation
    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
        body: JSON.stringify({
          email,
          amount: `${amount * 100}`,
          first_name,
          last_name,
          metadata: {
            userId,
            email,
            membershipType,
            paymentType: "membership",
            paymentMethod: "online",
            first_name,
            last_name,
          },
        }),
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data.data.access_code);
      res.status(200).json({
        message: "ID Card payment successful",
        access_code: data.data.access_code,
      });
    } else {
      next(new BadRequestError("Failed to update payment status"));
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to process membership payment", error });
  }
});

//WELFARE ONLINE

app.post("/api/v1/secure/payments/welfare", async (req, res, next) => {
  const {
    userId,
    email,
    amount,
    first_name,
    last_name,
    paymentMethod,
    paymentReference,
  } = req.body;
  console.log(email, amount, userId);

  try {
    // MAKE A POST REQUEST TO PAYSTACK API
    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
        body: JSON.stringify({
          email: `${email}`,
          amount: `${amount * 100}`,
          first_name,
          last_name,
          metadata: {
            userId,
            email,
            paymentType: "welfare",
            paymentMethod: "online",
            first_name,
            last_name,
          },
        }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw Error("Isseu happed");
    }
    const data = await response.json();
    console.log("ACCESS CODE", data.data.access_code);
    res.status(200).json({
      message: "ID card payment successful",
      access_code: data.data.access_code,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to process ID card payment", error });
  }
});

// OFFLINE PAYMENT

app.post("/api/v1/secure/offline-payment", async (req, res) => {
  const paymentReference = generateReference();
  const {
    userId,
    userEmail,
    first_name,
    last_name,
    paymentType,
    membershipType,
    amount,
    bank,
    accountName,
    channel,
  } = req.body;

  try {
    if (
      paymentType === "membership" &&
      ["Annual membership", "Corporate membership"].includes(membershipType)
    ) {
      // Create or update Membership Dues
      const membershipDue = await MembershipDues.create({
        userId,
        email: userEmail,
        full_name: `${first_name} ${last_name}`,
        membershipType,
        amount,
        startDate: new Date(),
        expiryDate: getExpiryDate(membershipType), // Adjust as needed
        year: new Date().getFullYear().toString(),
        status: "active",
        isMemberShipDuePaid: true,
        paymentMethod: "offline",
        paymentReference,
        paymentDate: new Date(),
        channel,
        account_name: accountName,
        bank,
      });

      // await sendEmailSendGridServices(
      //   sendPaymentEmailTemplate(membershipType, userEmail)
      // );
      await sendMailFunc(sendPaymentEmailTemplate(membershipType, userEmail));
      // send messsage to WhatsAPP
      res.status(200).json({
        message: `Offline membership payment for ${membershipType} successful`,
        membershipDue,
      });
    } else if (paymentType === "welfare") {
      // Create or update Welfare Dues
      const welfareDue = await WelfareDues.create({
        userId,
        email: userEmail,
        full_name: `${first_name} ${last_name}`,
        amount,
        startDate: new Date(),
        expiryDate: getExpiryDate(), // Default expiry date
        year: new Date().getFullYear().toString(),
        status: "active",
        isWelfareDuePaid: true,
        paymentMethod: "offline",
        paymentReference,
        paymentDate: new Date(),
        channel,
        account_name: accountName,
        bank,
      });
      // await sendEmailSendGridServices(
      //   sendPaymentEmailTemplate("welfare", userEmail)
      // );
      await sendMailFunc(sendPaymentEmailTemplate("welfare", userEmail));
      // send messsage to WhatsAPP
      res
        .status(200)
        .json({ message: "Offline Id card payment successful", welfareDue });
    } else {
      res.status(400).json({ message: "Invalid payment type" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to process offline payment", error });
  }
});

// VERIFY PAYSTACK SIGNATURE
const verifyPaystackSignature = (req, res, next) => {
  const secret = process.env.PAYSTACK_SECRET_KEY; // Replace with your Paystack secret key
  const hash = crypto
    .createHmac("sha512", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hash === req.headers["x-paystack-signature"]) {
    next(); // Proceed to the webhook handler
  } else {
    res.status(401).send("Unauthorized");
  }
};

//PAYSTACK WEBHOOK
app.post("/paystack-webhook", verifyPaystackSignature, async (req, res) => {
  const { event, data } = req.body;
  console.log("PAY STACK WEBHOOK:", event, data);
  if (event === "charge.success") {
    const { reference, amount, channel, paid_at, metadata, authorization } =
      data;
    const realAmount = amount / 100;
    try {
      if (metadata.paymentType === "membership") {
        // Create or update membership dues
        await MembershipDues.create({
          userId: metadata.userId,
          email: metadata.email,
          full_name: `${metadata.first_name} ${metadata.last_name}`,
          membershipType: metadata.membershipType,
          amount: realAmount,
          startDate: new Date(),
          year: new Date().getFullYear().toString(),
          expiryDate: getExpiryDate(metadata.membershipType), // Use the getExpiryDate function
          status: "active",
          isMembershipDuePaid: true,
          paymentMethod: metadata.paymentMethod,
          paymentReference: reference,
          paymentDate: paid_at,
          channel,
          account_name: authorization.account_name,
          bank: authorization.bank,
        });

        res.status(200).json({ message: "Membership payment successful" });
      } else if (metadata.paymentType === "welfare") {
        await WelfareDues.create({
          userId: metadata.userId,
          email: metadata.email,
          full_name: `${metadata.first_name} ${metadata.last_name}`,
          amount: realAmount,
          startDate: new Date(),
          expiryDate: getExpiryDate(), // Use the getExpiryDate function
          year: new Date().getFullYear().toString(),
          status: "active",
          isWelfareDuePaid: true,
          paymentMethod: metadata.paymentMethod,
          paymentReference: reference,
          paymentDate: paid_at,
          channel,
          account_name: authorization.account_name,
          bank: authorization.bank,
        });

        res.status(200).json({ message: "Payment updated successfully" });
      }
    } catch (error) {
      console.error("Failed to update payment:", error);
      res.status(500).json({ message: "Failed to update payment" });
    }
  } else {
    res.status(400).json({ message: "Invalid event" });
  }
});

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client/build/index.html"))
  );
} else {
  // app.get("/", (req, res) => {
  //   res.json({ message: "Welcome to the MembershipCMS backend API" });
  // });
  app.get("/", (req, res) => {
    res.send("Welcome to the MembershipCMS backend API");
  });
}
app.use(notfoundHandlerMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
