const AssetsManager = require('../../services/gcp/asset-manager');
const handle400 = require('../../middlewares/errorHandlers/handle400');

// TODO: this is super simple implementation which needs to be re-thinked
module.exports = (router) => {
  router.post('/', [], handle400, async (req, res) => {
    try {
      const image = await AssetsManager.upload(
        req.file.buffer,
        req.file.mimetype,
      );

      res.status(302).send({
        file: image.objectName,
      });
    } catch (error) {
      return req.handle500(error);
    }
  });
};
