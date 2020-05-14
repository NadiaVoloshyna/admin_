const AccessControl = require('accesscontrol');
const ac = new AccessControl();

// ## Roles
// author
// reviewer
// admin
// super

//# Server side roles
ac.grant('author')
    .createOwn(['person'])
    .deleteOwn('person')
    .updateOwn('person')
    .readAny(['person', 'persons'])
  .grant('super')
    .createOwn('person')
    .deleteAny('person')
    .updateAny('person')
    .readAny(['person', 'persons'])
  .grant('admin')
    .createOwn('person')
    .readAny(['person', 'persons'])
  .grant('reviewer')
    .readAny(['person', 'persons'])

module.exports = ac;