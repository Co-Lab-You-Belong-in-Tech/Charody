
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: 'Charody',
  credentials: JSON.parse(process.env.GCS_KEY)
});

function getFile(filename) {
  return storage.bucket(process.env.GCS_BUCKET).file('charody-files/' + filename);
}

function getDownloadStream(filename) {
  return storage.bucket(process.env.GCS_BUCKET).file('charody-files/' + filename).createReadStream();
}

function getUploadStream(filename) {
  return storage.bucket(process.env.GCS_BUCKET).file('charody-files/' + filename).createWriteStream({
    metadata: {
      contentType: 'image/jpg'
    }
  });
}

module.exports = {
  getFile,
  getDownloadStream,
  getUploadStream
};
