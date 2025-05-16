const QRCode = require("qrcode");

exports.nodeMailerEmailTemplate = async (applicant) => {
  // Function returns mailOptions object
  // usage const mailOptions = nodeMailerEmailTemplate(object value)
  const qrCodeUrl = await QRCode.toDataURL(applicant._id.toString());
  const mailOptions = {
    from: `"Lagos State Professional Photography Associattion of Nigeria" <lasppan@membersng.com>`,
    to: applicant.email,
    subject: "Your ticket is ready!",
    text: `Your ticket is ready!.\n\nApplicant Info:\nName: ${qrCodeUrl}\nEmail: ${applicant.email}\nPhone Number: ${applicant.phone_number}\n\nQR Code: ${qrCodeUrl}`,
    html: `<h1>your ticket is ready!.</h1>
                    <p><b>Dear ${applicant.full_name}</b></p>
                    <p>Your ticket to the Kerala Samajam Nigeria 2025 has been reserved and we are excited to have you join us for this immersive  experience!</p>
                   <p><b>Applicant Info:</b></p>
                   <ul>
                     <li>Name: ${applicant.full_name}</li>
                     <li>Email: ${applicant.email}</li>
                     <li>Phone Number: ${applicant.phone_number}</li>
                   </ul>
                    <p><b>Event Info:</b></p>
                    <ul>
                     <li>Event: ${applicant.event.title}</li>
                     <li>Time: ${applicant.event.time}</li>
                     <li>Venue: ${applicant.event.venue}</li>
                   </ul>
                   <p><b>Ticket details</b></p>
                   <img src="${qrCodeUrl}" alt="QR Code" />
               
                   <p>Order Number:   ${applicant._id}
        
                   `,
  };

  return mailOptions;
};

/*** @function  Function returns msg object
 usage const msg = sendGridEmailTemplate(object value)
 ***/
exports.sendGridEmailTemplate = (applicant) => {
  // Create a comma-separated string of family members' names
  const familyMembers =
    applicant.attendees && applicant.attendees.length > 0
      ? applicant.attendees.map((fam) => fam.attendee_full_name).join(", ")
      : "None";

  const msg = {
    from: `"Lagos State Professional Photography Associattion of Nigeria" <lasppanmembersng@gmail.com>`,
    to: applicant.email,
    subject: "Your ticket is ready!",
    text: `Your ticket is ready!.\n\nApplicant Info:\nName: ${applicant._id}\nEmail: ${applicant.email}\nPhone Number: ${applicant.phone_number}\n\nQR Code: https://api.qrserver.com/v1/create-qr-code/?data=${applicant._id}`,
    html: `<h1>Your ticket is ready!.</h1>
                    <p><b>Dear ${applicant.full_name}</b></p>
                    <p>Your ticket to the ${applicant.event.title} has been reserved and we are excited to have you join us for this immersive  experience!</p>
                   <p><b>Applicant Info:</b></p>
                   <ul>
                     <li>Name: ${applicant.full_name}</li>
                     <li>Email: ${applicant.email}</li>
                     <li>Phone Number: ${applicant.phone_number}</li>
                   </ul>
                   <p><b>Family member's Info:</b> ${familyMembers}</p>
                    
                    <p><b>Event Info:</b></p>
                    <ul>
                     <li>Event: ${applicant.event.title}</li>
                     <li>Time: ${applicant.event.time}</li>
                     <li>Venue: ${applicant.event.venue}</li>
                   </ul>
                   <p><b>Ticket details</b></p>
                  <img src="https://api.qrserver.com/v1/create-qr-code/?data=${applicant._id}" alt="" title="" />
               
                   <p>Order Number:   ${applicant._id}
        
                   `,
  };

  return msg;
};

// user email verification template

exports.verifyUserEmailTemplate = (
  fullUrl,
  newUserEamil,
  verificationToken
) => {
  const msg = {
    from: `"Lagos State Professional Photography Associattion of Nigeria" <lasppanmembersng@gmail.com>`,
    to: newUserEamil,
    subject: "Verify Email Address",
    text: `To complete your membership application, Please Verify your email address!.\n\nEmail: ${newUserEamil}`,
    html: `<h1>Lagos State Professional Photography Associattion of Nigeria.</h1>
           <p><b>Welcome </b></p>\n\n
           <p>To complete your membership application, Please click the button below to verify your email address.. </p>\n
           <p><a href='${fullUrl}/verify?token=${verificationToken}&email=${newUserEamil}'>Confirm your email address</a></p>\n
           <p>If you did not create an account, no further action is required.</p>\n\n
           <p>Regards</p>
           <p>LASPPAN Team</p> \n\n
           <hr> \n\n
           <p>If you're having trouble clicking the "Verify Email Address" button, copy and paste the URL below into your web browser
           '${fullUrl}/verify?token=${verificationToken}&email=${newUserEamil}'
           </p>
          `,
  };

  return msg;
};

// send reset password email template
exports.sendResetPassswordEmailTemplate = (token, fullUrl, email) => {
  console.log(email);
  const msg = {
    from: `Lagos State Professional Photography Associattion of Nigeria <lasppanmembersng@gmail.com>`,
    to: email,
    subject: `Reset your password`,
    text: `Reset your password!.\n\nEmail: ${email}`,
    html: `<h1>Lagos State Professional Photography Associattion of Nigeria.</h1>\n
           <p><b>Hi ${email} </b></p>\n
           <p>You recently took steps to reset the password. Click on the link below to reset your password.</p>\n
           <p><a href='${fullUrl}/reset-password?token=${token}&email=${email}'>Click here to reset your password</a></p>\n\n
           <p>This link will expire in 10 minutes after this email was sent.</p>\n\n\n
           <p>Sincerely,</p>
           <p>LASPPAN Team</p>
          `,
  };

  return msg;
};

// send Payment email
exports.sendPaymentEmailTemplate = (payment, email) => {
  console.log(email);
  const msg = {
    from: `Lagos State Professional Photography Associattion of Nigeria <lasppanmembersng@gmail.com>`,
    to: email,
    subject: `Dues Payment Information`,
    text: `Your dues payment information!.\n\nEmail: ${email}`,
    html: `<h1>Lagos State Professional Photography Associattion of Nigeria!.</h1>\n
           <p><b>Hi ${email} </b></p>\n
           <p>Your ${payment} payment was processed successully.</p>\n\n
           <p>Sincerely,</p>
           <p>LASPPAN Team</p>
          `,
  };

  return msg;
};
