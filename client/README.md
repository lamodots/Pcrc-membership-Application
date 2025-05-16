# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

TODO

- Refactor handlShowPopup and showMorePop use useContext for global state managemenet
- On mobile Avater sould be in the annoucement link shoulkd be at the side bar ✔️
- Hello lamodot welcome display none ✔️
- position sidebar so main content shows fully ✔️
- Configure dashbaord shared route and protected route ✔️
- Display route icon ✔️

TODO 2

- Validate all form input YUP and Formik and show user friendly error messages ✔️
- Start work on Admin dashboard ✔️

  - Create admin pages ✔️
  - Update all imports ✔️
  - Create admin login page ✔️
  - Update dashboard sidebar with admin navigations ✔️
  - Work on admin sidebar nested links ✔️

  TODO 3

- Begin working on Admin pages and validations

  - Overview ✔️
  - Content
  - Members
    - All ✔️
    - Add Member ✔️
    - Member details ✔️
  - Subscription ✔️
    - All ✔️
    - Create Subscription ✔️
    - Subscription detail ✔️
  - Announcement
    - All ✔️
    - Announcment details ✔️
    - Create Announcement✔️
  - Events
    - All ✔️
    - Craete Events ✔️
    - Event detail ✔️
  - ID Card
  - Settings ✔️

  TODO 4

- Begin working on backend end API

  - Set up basic route. ✔️
  - Deploy app on Render ✔️
  - Begin work on Admin Authentication ✔️
  - Begin work on user Authentication✔️
  - Begin work on API main routes. You can start from admin settings, get all users ✔️

  TODO 5

  - Add option to select app color code
  - Create ID card and dynamically display color, and user info ✔️
  - User can register for events and scan bar code to confirm✔️

  FINAL FEEDBACK TODO

  - Change event banner ✔️
  - Membership status and link: If members dont have subscription,
    we should say no subscription and show a link to subscribe on Overview page. ✔️
  - Fix: Fix sidebar close when a route is clicked ✔️.
  - ID card should be availabe to only subscribed memebrs ✔️
    but they should still be able to go to Id card page.
  - Life member and Honorary member to see only warefare when they go to do page. ✔️
  - On memberships card for member / remove email and make it phone number ✔️
  - The current desctrit should be state AND Add a selection for desctrict.
  When user elect state it should auto fill the destrict. ✔️
  <!-- https://simple.wikipedia.org/wiki/List_of_districts_of_India -->

  - Memebrs should be able to add family member or remove from profile.✔️
  - Admin Create a moderator or admin // stakeholders changed the idea ✔️
  - System Admin should not show in the list of members ✔️
  - Admin should be able to update members membership. Example, give member Honourary member, Life member.

  - Add option to check if event is FREE or paid. If is Free users will not see `Reserve a seat button` on event details page.

````js


## 22nd April 2025 final review
```js
Payment test through paystack not reflecting in members account (No need)
Subscription type - Should show Required payment. Anual member, Life member , or honorary member (No need)
in members list - can we add more informations , apart from e mail (No need)
WhatsApp sample phone number can change it to a dummy number +234 807 498 3773 ✔️
While editing profile its asking state again ✔️
Profile picture is not showing member detail page : ✔️
Title can show in member detail page ✔️
Need to add Industry type somewhere to see by all members ✔️
Can we add an advert space for sponsors
Need some beautiffication in ID card

````

## 25th April 2025 Final View

### USERS

- resend email for verification - There is no feeling that i clicked on "resend" button until the pop up appeared

- click the link for verifying mail - showing verification failed
- States in india - can add remaining states also
- Profile editing page - main person title not showing

- Profile page family member title can show ✔️

- profile page - if the person choose other - it can be hide
- Annual membership payment online successes and mail receiving - But not applying member page

- Can annual payment button disaapear if only welfare due is pending ? can welfare due also disappear if all payments completed ?

- ID card is showing after only membership subscription - it should show after all dues completed ✔️

- Members list also showing after only membership subscription - it should show after all dues completed ✔️
- Other users are seeing honorary membership status as Annual member

- Membership ID card design remaining
- In Overview page - latest announcement can show, now the old announcement is showing ✔️
- Search member is working - not able to search with family member name and id card number ✔️

  ### ADMIN

- Subscription type not picking
- Search member place not working ✔️
- Any possibility for admin or secretary can see the list of members not paid or partially paid ?

  //vercel.json file

# FEED BACK

- User should be able to change their email on signup incase the typed in a wrong email
- Unverified users should not show on user list in the dashboard.
  {
  "installCommand": "npm install --legacy-peer-deps",
  "version": 2,
  "builds": [
  {
  "src": "index.js",
  "use": "@vercel/node"
  },
  {
  "src": "src/**/*",
  "use": "@vercel/static"
  }
  ],
  "routes": [
  { "src": "/(.*)", "dest": "/" }
  ]
  }

```

"scripts": {
"start": "react-scripts start",
"build": "npm install --legacy-peer-deps && react-scripts build",
"postinstall": "npm install --legacy-peer-deps",
"test": "react-scripts test",
"eject": "react-scripts eject"
},

<!-- //EAAFVXw8ns9ABOy7AnebgdsZBAyC8cVyKGi4x8ZACetzCdLso0XRoZCZBUUZASaoZAbdhSAcavDSpXrtZCTjFER3uluGfd1XwiFyaCxYlSUT9YVqdJHhgHajI5uBo6Ix1TV2pKbqnkQxmOKZBclNZBTZA5wWHFMf5RT7PkmCpt8hITaXZCxPg7OnKm0mgbLbGTq6yippvXpJi0FXbWddAsMsVAl4nVMrLZCwW3JPyqhDcXbs9UHcLJwQtJxanHgomfl3Ey0FBMsuBY9xbHwZDZD -->
```
