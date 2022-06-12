const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const { getUploadStream } = require('../utils/GCS.js');

class GCSStorage {

  getDestination(req, file, cb) {
    if(!req.user._id) return cb(new Error('req.user._id must be defined'), '');
    cb(null, `${req.user._id}/${file.fieldname}.jpg`);
  }

  _handleFile(req, file, cb) {
    this.getDestination(req, file, (err, path) => {
      if (err) return cb(err);
  
      const outStream = getUploadStream(path);
  
      const transform = sharp();
      transform.resize(1000, 1000, {
        fit: 'inside'
      }).jpeg().pipe(outStream);

      file.stream.pipe(transform);
      outStream.on('error', cb);
      outStream.on('finish', () => {
        cb(null, {
          path,
          size: outStream.bytesWritten
        });
      });
    });
  }

  _removeFile(req, file, cb) {
    cb(new Error('I did not implement this'));
  }
}

const allowedTypesAndExtensions = {
  'image/jpg': ['.jpg', '.jpeg'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png']
};

const upload = multer({
  storage: new GCSStorage(),
  limits: {
    fileSize: 52428800 // 50 MB
  },
  fileFilter: (req, file, cb) => {
    const extensions = allowedTypesAndExtensions[file.mimetype];
    const extension = path.extname(file.originalname).toLowerCase();
    if (!extensions) return cb(new Error('file type not allowed'), false);
    if (!extensions.includes(extension)) return cb(new Error('file extension not allowed'), false);
    return cb(null, true);
  }
});

const multerMiddleware = upload.fields([{ name: 'id', maxCount: 1 }, { name: 'selfie', maxCount: 1 }]);


module.exports = multerMiddleware;
