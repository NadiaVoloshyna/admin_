const { ObjectId } = require('mongoose').Types;
const { PERSON_POST_STATUSES } = require('../../common/constants');

module.exports.everyMongoId = (value) => {
  try {
    return value.split(',').every((item) => ObjectId.isValid(item));
  } catch (error) {
    return false;
  }
};

module.exports.everyStatus = (value) => {
  try {
    return value.split(',').every((item) => PERSON_POST_STATUSES[item]);
  } catch (error) {
    return false;
  }
};
