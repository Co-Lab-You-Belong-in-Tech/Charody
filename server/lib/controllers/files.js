const { Router } = require('express');
const customeMulter = require('../middleware/multer.js');
const { getFile } = require('../utils/GCS.js');


module.exports = Router()
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
  .get('/selfie', async (req, res, next) => {
    try {
      const gcsFile = getFile(`${req.user._id}/selfie.jpg`);
      const exists = await gcsFile.exists();
      if(!exists[0]) return res.sendStatus(404);
      res.writeHead(200, {
        'Content-Disposition': 'filename=selfie.jpg',
      });
      gcsFile.createReadStream().pipe(res);
    } catch (error) {
      next(error);
    }
  })
  .post('/id', customeMulter.single('id'), async (req, res, next) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  })
  .post('/selfie', customeMulter.single('selfie'), async (req, res, next) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  });
