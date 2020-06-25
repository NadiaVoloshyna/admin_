const mongoose = require('mongoose');
const handleError = require('../../helpers/handleError');

module.exports = (router) => {
  /**
   * Get images by id
   */
  router.get('/:id', (req, res) => {
    const _id = req.params.id;

    mongoose.gridfs.exist({ _id }, (error, file) => {
      if (error || !file) {
        return handleError.custom(res, 404, error);
      }
      const readstream = mongoose.gridfs.createReadStream({ _id });
      readstream.pipe(res);
    });
  });
};
