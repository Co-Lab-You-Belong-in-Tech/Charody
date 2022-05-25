const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const authenticate = require('./middleware/authenticate.js');
const authorize = require('./middleware/authorize.js');

// Built in middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'localhost:3000',
      'https://charody-staging.netlify.app',
      'https://charody.netlify.app'
    ],
    credentials: true,
    exposedHeaders: ['Set-Cookie'],
  })
);

// App routes
app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/listings', authenticate, authorize, require('./controllers/listings'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/notFound'));
app.use(require('./middleware/error'));

module.exports = app;
