const router = require('express').Router();
const mongoose = require('mongoose');
const handleError = require('../helpers/handleError');
const stream = require('stream');

/**
 * Get images by id
 */
router.get('/:id', (req, res) => {
  const _id = req.params.id;

  mongoose.gridfs.exist({ _id }, (error, file) => {
    if (error || !file) {
      return handleError.custom(res, 404, error);
    } else {
      const readstream = mongoose.gridfs.createReadStream({ _id});
      readstream.pipe(res);
    }
  });
});

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

module.exports = router;