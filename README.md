# Deployed App

Try out the app [here](https://myapp-abb28.firebaseapp.com)

- Sign up as a new user
- Login and see the homepage
- Sign out

# Problem Definition

**Design a signup/login/logout workflow for a web app as follows:**

1. Signup lets you create a new user with email/password, login lets you login as that user and logout ends the user session
2. If a user does **not** log out, the session is persisted so that when they reopen the app in the same browser, they are already logged in
3. If a user has logged out they **must** be required to login before being able to access any private pages of the app

![Login Logout workflow](/images/login-logout.png)

# Architecture

| Libraries     | Description                      |
| ------------- | -------------------------------- |
| Firebase Auth | User authentication as a service |
| React         | Front-end framework              |
| React-Router  | Routes for /signup, /login and / |

## Firebase Auth

Each page of the webapp needs to first figure out the auth state of the user and then either render or redirect to /login.

The recommended approach to get the auth state in firebase is attaching an observer:

```
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
  }
});

```

## React

We have a 1:1 mapping between a "page" and a React component. So, every component needs to:

- attach this observer before it mounts
- detach this observer when it unmounts

**Note**: Attaching the listener in **componentDidMount**, results in an initial flicker on the screen. For example, if a user is logged out and they try to access "/", a bit of content appears before the listener code kicks in and the app realises that user needs to be redirected to login. Hence, a better approach is to attach the listener **in the constructor**, before the component mounts.

We will achieve this using a [higher-order component](https://reactjs.org/docs/higher-order-components.html) (HOC) in React.

- With a HOC, we abstract out the auth logic in a component called [withAuth](https://github.com/asmitab/react-firebase-login/blob/master/src/components/auth.js)
- Each new page (or each new component) is wrapped in withAuth and receives the up-to-date auth state
- Each component can then define custom behavior based on the auth state

## Alternate Approches

### Shared Component

The idea was to create an 'Auth' component to listen to the auth state and then render this component first in every other component's render.

**Pros**: Easier to learn and implement compared to HOC

**Cons**: Redirection logic based on auth state needed to be written in the 'Auth' component which was getting harder to get right and also defying the seperation of concerns principle

### Context

The idea was to create a [React context](https://reactjs.org/docs/context.html) for the current user object.

**Cons**: To implement a context you need a provider and consumers. The provider sets the context which the consumer receives. It was difficult to determine how to design that for our use case, since the provider may be any component that loads first.

# Learnings

- HOCs are a great way of abstracting out common logic across components and reusing it.
- Testability is better as well - you can mock the HOC part but providing the props yourself and just test out the component functionality as in [this](https://github.com/asmitab/react-firebase-login/blob/master/src/pages/__tests__/login.js) test.

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
