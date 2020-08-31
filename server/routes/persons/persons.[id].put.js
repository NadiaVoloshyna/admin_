const { body, check } = require('express-validator');
const Person = require('../../models/person');
const Asset = require('../../models/asset');
const References = require('../../models/references');
const handle400 = require('../../middlewares/errorHandlers/handle400');

/**
 * Update single person
 */
module.exports = (router) => {
  router.put('/:id', [
    check('id').isMongoId(),
    body('name').isString().not().isEmpty()
      .escape(),
    body('portrait').if(body('portrait').exists()).isString().escape(),
    body('born').if(body('born').exists()).isString().escape(),
    body('died').if(body('died').exists()).isString().escape(),
  ], handle400, async (req, res) => {
    const { name, portrait, born, died, professions } = req.body;
    const { id } = req.params;

    try {

      const person = await Person.findById(id);
      const references = await References.findOne({personId: person._id});

    if(!person.portrait && portrait ) {
      const asset = await Asset.findOne({url: portrait});
      references.assetId.push(asset._id);
      await references.save();
      }

    if(!!proffesions) {
      const mediaId = person.professions.media;
      const assetProffesion = await Asset.findById(mediaId);
      references.assetId.push(assetProffesion._id);
      await references.save();
    }



      await Person.updateOne(
        { _id: id },
        {
          name,
          portrait,
          born,
          died,
          professions
        }
      );

    } catch (error) {
      return req.handle500(error);
    }

    res.status(200).end();
  });
};
