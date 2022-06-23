const { Router } = require('express');
const { ObjectId } = require('mongodb');
const ListingDAO = require('../DAOs/ListingDAO');
const isAdminEmail = require('../utils/isAdminEmail.js');

//TODO add switch for production and staging URLs
const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:7890/api/v1' : 'https://charody.herokuapp.com/api/v1';


module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      if(!isAdminEmail(req.user.email)) return res.sendStatus(401);
      const randomUser = await ListingDAO.getRandomUnverifiedUser();
      const { firstName, lastName, userId } = randomUser;
      const userInfo = {
        userId,
        firstName,
        lastName,
        idUrl: `${apiUrl}/files/id/${userId}`,
        selfieUrl: `${apiUrl}/files/selfie/${userId}`
      };
      res.json(userInfo);
    } catch (error) {
      next(error);
    }
  })
  
  .post('/:userId', async (req, res, next) => {
    try {
      const { approved } = req.body;
      if(typeof approved === 'undefined') return res.sendStatus(403);
      if(!isAdminEmail(req.user.email)) return res.sendStatus(401);
      await ListingDAO.setValidVerification(new ObjectId(req.params.userId), approved);
      res.json({ ok: 'ok' });
    } catch (error) {
      next(error);
    }
  });
