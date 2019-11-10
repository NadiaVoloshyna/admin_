const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/images/:id', (req, res) => {
  const _id = req.params.id;

  const readstream = mongoose.gridfs.createReadStream({ _id });

  readstream.on('error', function (err) {
      console.log('An error occurred!', err);
      throw err;
  });
  
  readstream.pipe(res);
});


router.post('/images/upload', async (req, res) => {
  const filename = req.files.image.name;

  mongoose.connection.db.collection('fs.files', (err, collection) => {
    collection.findOne({ filename }, (error, file) => {
      if (error) throw error;
      if (!file) {
        req
          .pipe(mongoose.gridfs.createWriteStream(filename))
          .on('error', res.send(500))
          .on('close', (file) => res.send(file._id));
      } else {
        res.send(file._id);
      }
    })
  });
});

module.exports = router;