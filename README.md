# Overview

While building a web app with React, one of the first tasks I set out to achieve was the sign-up/sign-in/sign-out workflow. The behavior is fairly common for most modern webapps:

![Login Logout workflow](/images/login-logout.png)

Conversely, if a user is signed in and goes to /login or /signup, they must be redirected to the default landing page for a signed up user.

Given the requirements, my web app uses the following packages/services:

* React Router : To implement app routes like /login, /signup and /dashboard
* Firebase Auth: To securely store user data and get their current sign-in status

