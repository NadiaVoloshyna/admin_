const mongoose = require('mongoose');
const handleError = require('../../helpers/handleError');
const stream = require('stream');

module.exports = (router) => {
    /**
   * Upload an image
   */
  router.post('/', (req, res) => {
    const filename = req.files && req.files.file && req.files.file.name;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    mongoose.connection.db.collection('fs.files', (err, collection) => {
      collection.findOne({ filename }, (error, file) => {
        if (error) {
          return handleError.custom(res, 500, error);
        }
        
        if (!file) {
          const writestream = mongoose.gridfs.createWriteStream({ filename });
          const bufferStream = new stream.PassThrough();

          bufferStream.end(new Buffer(req.files.file.data));
          bufferStream.pipe(writestream);

          writestream.on('close', (file) => {
            res.send(file._id);
          });

          writestream.on('error', (error) => {
            return handleError.custom(res, 500, error);
          });
        } else {
          res.send(file._id);
        }
      })
    });
  });
}