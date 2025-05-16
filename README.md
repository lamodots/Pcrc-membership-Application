# Membership application software

An all-in-one platform connecting photographers to a vibrant community, professional opportunities, and exclusive resources. This membership application is designed for photographers of all levels to showcase their work, expand their skills, and connect with potential clients and collaborators.

## Key Features:

- Member Management: Stores and manages member information, including contact details, membership status, and renewal dates.

- Online Registration: Allows members to sign up and renew their memberships online.

- Payment Processing: Handles membership fees, dues, and other payments.

- Event Management: Facilitates the organization and registration for events and activities.

- Communication Tools: Sends out newsletters, emails, and notifications to members.

- Reporting and Analytics: Generates reports on membership trends, financials, and other metrics.

## Root Level

/membership-app
│
├── /server
│ ├── /controllers
│ ├── /models
│ ├── /routes
│ ├── /middlewares
│ ├── /config
│ ├── /utils
│ ├── /services
│ ├── /tests
│ ├── app.js
│ ├── index.js
│ └── .env
│
├── /client
│ ├── /public
│ ├── /src
│ │ ├── /assets
│ │ ├── /components
│ │ ├── /pages
│ │ ├── /services
│ │ ├── /contexts
│ │ ├── /utils
│ │ ├── App.js
│ │ ├── index.js
│ │ └── styles.css
│ ├── .env
│ └── package.json
│
├── /node_modules
├── package.json
└── README.md

## Detailed Breakdown

### Server

- controllers/: Logic for handling requests and sending responses.

- models/: Mongoose schemas and models.

- routes/: Define routes and map them to controllers.

- middlewares/: Custom middleware functions.

- config/: Configuration files (e.g., database connection).

- utils/: Utility functions and helpers.

- services/: Business logic and external services interactions.

- tests/: Test files for the backend.

- app.js: Application setup (e.g., middleware, routes).

- index.js: Server setup (e.g., listening on a port).

### Client

- public/: Static files (e.g., index.html).

- src/: Source files.

- assets/: Images, icons, and other static assets.

- components/: Reusable React components.

- pages/: Page components.

- services/: API calls and other services.

- contexts/: Context API providers and consumers.

- utils/: Utility functions and helpers.

- App.js: Main application component.

- index.js: Entry point for the React app.

### Other Files

- node_modules/: Dependencies installed via npm.

- package.json: Configuration for npm scripts and dependencies.

- README.md: Project documentation.

### BACKEND routes

- ### Auth

      ### SECURE
      -   /api/v1/secure/add:
            - Secure user can be added to database as moderator ✔️
            - The add route should be protect for only admin user ✔️

      -   /api/v1/secure/login:
            - Secure user sould be able to login using email and password.✔️
            - Secure user login access token and refresh token should stored on session ✔️

            - Only loggedin moderator or admin user role can access secure dashboard ✔️
            - /api/v1/secure/logout ✔️

      -

      -   /api/v1/secure/forgot-password
      -   /api/v1/secure/reset-password


      ### USERS
      -   /api/v1/user/login:
      -   /api/v1/user/signup:
      -   /api/v1/user/forgot-password
      -   /api/v1/user/reset-password

# FRONT-END

      - EVENT
            - Admin can Create event
            - Admin can delete and edit event
            - Users can view and apply for an event
            - Users can recieve email containing  the QR code of the applied event
            - There will be a portal(page )to verify user event application.(protected to admin alone)
      - List all members for users.
      - List all for admin and functionality to suspend and delete user.
      - Remove the timer / make it stop when user subscriptions ends
      - Admin should be able to store and and retrive configuration files in from DB
            - Whatsapp key
            - Paystack key
            - Cloundinary key
      - Pass correct WhatsApp message configuration file and test brith day message.

      - CERTIFICATE
            - members can print certifcate.

<!-- https://www.linkedin.com/pulse/software-testing-101-beginners-guide-types-techniques-wgphc/ -->

```js

{
  "image": "https://placehold.co/400",
  "firstname": "john",
  "lastname": "doe",
  "email": "john@gmail.com",
  "password": "1234567890",
  "Dob": "2010-10-20",
  "phone": "08080808089",
  "location": "Lagos",
  "address": "Ikeja mall",
  "aboutuser": "Tall and lanky",
  "social": [
    {"facebook": "https://www.facebook.com"},
    {"linkedIn": "https://linkedin.com"}
  ],
  "interest": ["landscape", "event"]
}

```

DALLAS SOFTWARE APPLICATION
https://docs.google.com/forms/d/e/1FAIpQLSdICY7jRl7wdsYtOm6ebz3iMyf4KGZ7tLB5cIZrUUO1tThD7g/viewform

The goal is to understand your vision, validate compatibility, align expectations, and assess if the partnership is mutually beneficial.

// scan qrcode, when processing scan`Scanning processing...`
// update user attended property only if the user have been approved
// if user have been marked as attended it should respond with `Dublicate Entry Detected`
//

# build script before dependency issue

`"build": "npm install &&  npm --prefix client install && npm run build --prefix client",`

if (process.env.NODE_ENV === "production") {
const **dirname = path.resolve();
app.use(express.static(path.join(**dirname, "client", "build")));
app.use(
"/uploads",
express.static(path.join(\_\_dirname, "client", "public", "uploads"))
);

app.get("\*", (req, res) =>
res.sendFile(path.resolve(**dirname, "client", "build", "index.html"))
);
} else {
app.use(
"/uploads",
express.static(path.join(**dirname, "client", "public", "uploads"))
);

app.get("/", (req, res) => {
res.json({ message: "Welcome to the MembershipCMS backend API" });
});
}

// Final Test second test
// Iterations

1 User can only apply for 1 event == Don

https://www.twilio.com/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication?_gl=1*11qg34m*_gcl_au*MTUxMzUzNDY0My4xNzM4MDg0NzI4*_ga*MTMzNDgwMzgzNy4xNzM2ODczMTA2*_ga_8W5LR442LD*MTczODMzOTg5OC40LjEuMTczODM0MDAzNC4wLjAuMA..

//accountSid: US879be6129ee4fd98dd41f3ba1096b7ae

EVEST
TYPES OF

1. completely free event : Free for both paid and none paid members.
2. Free for members: free for subscribed memebers non subscribed members have to pay a feee
3. paid event

SUBSCRIPT
Normal membership is annual: April to march the duration of the user is determined by when he/she subscribed

REGISTRATION
When users are resgitarering they will fill the year they entered Nigeria for KSN for LASPAN it be when they started their profession.

FEEDBACKS========

1. Improve on front Camera scanning
2. Family memebeer should be counted as number of attended
3. QR code not showing on custom emails.(SENDGRID ISSUE) Find how
4. Add a link to RQcode for users that dont recieve image on email

# VERSION 2

1. We need list members on admin dashboard so admin can apperove offline payment
2. List members so admin can see transactions. Filter event by type of payment.

`A confirmation email has been sent to your email address. Please click on the link in the email to verify your email address.`
ikeja/ iKORODU/oTA, VI/ikoYI, iLUPEJU, Sulurele/aPAPA, others

//https://rubygarage.org/blog/ceo-responsibilities-in-startup#:~:text=The%20key%20roles%20of%20a%20CEO%20during%20this,real-world%20environment%204%20Analyze%20product%20metrics%20and%20KPIs

AWS DOCKER
https://chathuratd.medium.com/deploying-a-mern-stack-web-app-with-github-actions-docker-and-aws-ec2-509067a1fd64

// Full-Stack Software engineer passionate about innovation, eager to tackle technical challenges, and committed to creating impactful, user-centric solutions.

<!-- it should be even if a member pays for an annual membership a few days before March 1, the expiration date will be set to March 1 of the same year . else it should be set to March the following year

 const currentYear = new Date().getFullYear();
  const currentDate = new Date();
  const marchFirstThisYear = new Date(currentYear, 2, 1);

  const isBeforeMarchFirst = currentDate < marchFirstThisYear;

  const expiryDate = isBeforeMarchFirst
    ? marchFirstThisYear // March 1 of the same year
    : new Date(currentYear + 1, 2, 1); // March 1 of the next year -->

"scripts": {
"start": "node server/src/index.js",
"build": "npm install && npm --prefix client install --legacy-peer-deps && npm --prefix client run build",
"server": "nodemon server/src/index.js",
"test": "echo \"Error: no test specified\" && exit 1"
},

//TOPSHIP.AFRICA

//HEADLESS CMS

<!-- https://dev.wix.com/docs/go-headless -->
