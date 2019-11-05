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

module.exports = router;