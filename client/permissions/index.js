import AccessControl from 'accesscontrol';

const GrantList = {
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
  admin: {
    person: {
      'create:own': ['*'],
      'delete:any': ['*']
    },
    'person-assignUser': {
      'create:any': ['*'],
    },
    document: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
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
