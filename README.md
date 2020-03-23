# Overview

While building a web app with React, one of the first tasks I set out to achieve was the sign-up/sign-in/sign-out workflow. The behavior is fairly common for most modern webapps:

![Login Logout workflow](/images/login-logout.png)

Conversely, if a user is signed in and goes to /login or /signup, they must be redirected to the default landing page for a signed up user.

Given the requirements, my web app uses the following packages/services:

- React Router : To implement app routes like /login, /signup and /dashboard
- Firebase Auth: To securely store user data and get their current sign-in status

# Deployed App

Try out the app [here](https://myapp-abb28.firebaseapp.com)

- Sign up as a new user
- Login and see the homepage
- Sign out

# Local Build

For running this locally, you need your own Firebase project

## Firebase

- You need to create a firebase project and register a web app as mentioned in Steps 1 & 2 [here](https://firebase.google.com/docs/web/setup)
- Enable email/password authentication in your project as listed [here](https://firebase.google.com/docs/auth/web/password-auth)

## Env variables

Get your firebase api config as mentioned [here](https://support.google.com/firebase/answer/7015592)

```
export REACT_APP_FIREBASE_CONFIG='{"apiKey":"YOUR_KEY_HERE"}'
```

## Start locally

After you have cloned the repo:

```
npm install
npm start
```

This should start the web app at: [http://localhost:3000/](http://localhost:3000/)

## Test

```
npm test
```
