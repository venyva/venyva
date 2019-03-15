# Work in progress
Implementing [react-native-navigator](https://wix.github.io/react-native-navigation/#/)


Run application in IOS simulator
```
$ react-native run-ios
```

02-01-2019 : Implemented
- login page
- navigation
- basic structure and pattern for screens

02-02-2019 : Implemented
- redux
- login async (hardcoded)
- react redux dev tools w/ logger
- foundation of application is laid out

4 hours

02-03-2019
- registration screen | ui | reducer | actions | wired up
- broke out reducers / actions to be less coupled. Each screen has its own reducer and actions
- setup navigation for stack pop for registration view from "JOIN" button
- minor cleanup

1 hour

02-06-2019
- Alert component created
- reducer cut down for registration
- registration form creation and submission of payload to async method for userpool processing
- action request created for async method call to user pool 
- added dependencies for cognito
- created userpool and identity pool
- created config to access userpool and identity pool
- Handling error and display of error through component

2 hour

02-07-2019 
- Code Verification Screen Setup
- Navigation setup to code verification screen
- placeholder actionRequest put in place
- Code Verification Thunks, actions, reducer added to store
- Registration screen reducer updated to allow user data"

1 hour

02-07-2019
- Login Page setup | reducers, actions etc..
- Verfication process completed | navigation
- Adding core actions where needed to reducers
- Managing cognito user
- verified confirmed user registration 
- registration DONE

3 hour

02-08-2019
- react native elements for text input , buttons etc.. [react-native-material-kit](https://github.com/xinthink/react-native-material-kit)
- mask setup for phone number and submitable  [react-native-masked-text](https://www.npmjs.com/package/react-native-masked-text)
- cleanup of register
14 hours - integrated and successful with instagram (removed due to MVP request)
minus 6 hours

2 hour

02-09 : 
- Style Login/Welcome Screen : 1:30:00
- Registration save to store for sign up : 2:30:00
- Create new page : UsernamePasswordSceen : 00:30:00
  - route registration page to username password screen on submit
- Get registration payload data from redux on username password screen from usernamePasswordState : 00:10:00
- Create UI/style for UsernamePassword Screen : 00:15:00
- action for adding username and password to the registration payload: 00:20:00
- check that passwords match & turn confirm password from gray to green when they do : 00:30:00
- submit registration payload with username and password to THUNK action for signup processing : 00:12:00
- successful user addition to userpool using new setup as of 02-09 : 00:20:00
- navigate successful user update to redux store to verification page : 00:20:00
- submit code from verification page and confirm user on userpool : 00:10:00 (pre built from before)
- verification page UI / Styling & change page on success verification to done page : 1:00:00
- Done page UI / Styling & change page on finish button click to tab navigation && clcik login but your already been logged in (rehydrate) : 1:10:00
- UI / Styling for Register Screen & setting form validation (should container form info for firstname, lastname, email, handicape is optional) & get the base for form validation for the rest of the app: 2:20:00
- submit login information / action, reducer, action request & handle logout & link cognito library * rework some register data onto core platform : 2:40:00

- Validate form for registration page : x
  - email 
  - number for handicap
  - letters only for names
- Validate form for password
  - 8 chars, special char, capital char, number (check)
- notifications
  - user exists
  - wrong code
  - what else?
  
  9 hours




TODO
- User Already exists - handle scenario
- login functionality
- core css 
  - form - done
- review core actions and reducer / cleanup - in progress
- create video to share for Tuesday - done
- successful registration of user. Issue with secret key as of 02-06-2019

Other: 
- react redux dev tools - `open "rndebugger://set-debugger-loc?host=localhost&port=8081"`
- [react-native-fbsdk](https://github.com/facebook/react-native-fbsdk)
codeVerificationScreenReducer
