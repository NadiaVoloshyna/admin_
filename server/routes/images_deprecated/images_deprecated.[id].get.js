const mongoose = require('mongoose');
const handleError = require('../../helpers/handleError');

module.exports = (router) => {
  /**
   * Get images by id
   */
  router.get('/:id', (req, res) => {
    const _id = req.params.id;

    mongoose.exist({ _id }, (error, file) => {
      if (error || !file) {
        return handleError.custom(res, 404, error);
      } else {
        const readstream = mongoose.createReadStream({ _id});
        readstream.pipe(res);
      }
    });
  });
}