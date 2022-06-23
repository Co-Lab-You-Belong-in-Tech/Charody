const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const UserDAO = require('../DAOs/UserDAO');
const UserService = require('../services/UserService');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  })

  .post('/sessions', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const sessionToken = await UserService.signIn({ email, password });

      res
        .cookie(process.env.COOKIE_NAME, sessionToken, {
          secure: process.env.NODE_ENV === 'production',
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .json({ message: 'Signed in successfully!' });
    } catch (error) {
      next(error);
    }
  })

  .get('/me', authenticate, async (req, res, next) => {
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  })

  .delete('/sessions', authenticate, (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      })
      .json({ success: true, message: 'Signed out successfully!' });
  })

  .delete('/', authenticate, async (req, res) => {
    await UserDAO.deleteUser(req.user.email);
    res.json({
      success: true,
      message: `Deleted user with email of ${req.user.email}`,
    });
  })

  .get('/verify', async (req, res, next) => {
    try {
      const { email, code } = req.query;
      const valid = await UserDAO.verifyEmail(email, code);
      if(valid) {
        res.json({ message: 'account verified' });
      } else {
        res.status(401).json({ message: 'invalid code' });
      }
    } catch (e) {
      next(e);
    }
  });
