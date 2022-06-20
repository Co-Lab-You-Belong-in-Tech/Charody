const { Router } = require('express');
const customMulter = require('../middleware/multer.js');
const { getFile } = require('../utils/GCS.js');
const isAdminEmail = require('../utils/isAdminEmail.js');


module.exports = Router()
  .get('/id/:userId', async (req, res, next) => {
    try {
      if(!isAdminEmail(req.user.email)) return res.sendStatus(401);

      const gcsFile = getFile(`${req.params.userId}/id.jpg`);
      const exists = await gcsFile.exists();
      if(!exists[0]) return res.sendStatus(404);
      res.writeHead(200, {
        'Content-Disposition': 'filename=id.jpg',
      });
      gcsFile.createReadStream().pipe(res);
    } catch (error) {
      next(error);
    }
  })
  .get('/id', async (req, res, next) => {
    try {
      const gcsFile = getFile(`${req.user._id}/id.jpg`);
      const exists = await gcsFile.exists();
      if(!exists[0]) return res.sendStatus(404);
      res.writeHead(200, {
        'Content-Disposition': 'filename=id.jpg',
      });
      gcsFile.createReadStream().pipe(res);
    } catch (error) {
      next(error);
    }
  })
  .get('/selfie/:userId', async (req, res, next) => {
    try {
      if(!isAdminEmail(req.user.email)) return res.sendStatus(401);

      const gcsFile = getFile(`${req.params.userId}/selfie.jpg`);
      const exists = await gcsFile.exists();
      if(!exists[0]) return res.sendStatus(404);
      res.writeHead(200, {
        'Content-Disposition': 'inline; filename=selfie.jpg',
      });
      gcsFile.createReadStream().pipe(res);
    } catch (error) {
      next(error);
    }
  })
  .get('/selfie', async (req, res, next) => {
    try {
      const gcsFile = getFile(`${req.user._id}/selfie.jpg`);
      const exists = await gcsFile.exists();
      if(!exists[0]) return res.sendStatus(404);
      res.writeHead(200, {
        'Content-Disposition': 'inline; filename=selfie.jpg',
      });
      gcsFile.createReadStream().pipe(res);
    } catch (error) {
      next(error);
    }
  })
  .post('/id', customMulter.single('id'), async (req, res, next) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  })
  .post('/selfie', customMulter.single('selfie'), async (req, res, next) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  });
