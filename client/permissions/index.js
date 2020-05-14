import AccessControl from 'accesscontrol';

let GrantList = {
  super: {
    person: {
      'create:own': ['*'],
      'delete:any': ['*']
    },
    'person-assignUser': {
      'create:any': ['*'],
    },
    'person-deactivateUser': {

    },
    document: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    },
    inviteAuthor: {
      'create:any': ['*'],
    },
    inviteWriter: {
      'create:any': ['*'],
    },
    changeStatus: {
      'create:any': ['*'],
    }
  },
  // Author permissions
  author: {
    person: {
      'create:own': ['*'],
      'delete:own': ['*']
    },
  },
  reviewer: {
    document: {
      'read:any': ['*'],
      'update:any': ['*'],
    },
  }
};

export default new AccessControl(GrantList);