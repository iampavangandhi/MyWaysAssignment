<div align="center">

# MyWays Coding Assignment

</div>

### This repo contains a basic implementation of the following tasks:

1. User registration / sign up (with OTP)
2. User login
3. Forgot / Reset Password
4. Logout

### Config Keys

```javascript
// Frontend
REACT_APP_URL=XXXX (For Development: "http://localhost:4000/")

// Backend
DATABASE_URI=XXXX
SECRET=XXXX
SENDGRID_API_KEY=XXXX

```

- `SECRET` is the JWT Secret.
- `SENDGRID_API_KEY`: I used sendgrid service to send OTP mails.

### Build Setup

```javascript
// To Install Client Dependencies
"client-install": "npm install --prefix client",

// Start the server
"start": "node server.js",

// Start the server (with nodemon)
"server": "nodemon server.js",

// Start the client server (react server)
"client": "npm start --prefix client",

// Start both servers concurrently
"dev": "concurrently \"npm run server\" \"npm run client\""
```
