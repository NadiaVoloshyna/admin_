export const permissions = {
  super: {
    document: 'edit'
  },
  admin: {
    document: 'view'
  },
}

export const getPermissions = (page, user, person) => {
  if (page === 'Person') {
    const permission = person.permissions.find(item => item.userId === user._id);
    let documentAccess = 'none';

    if (permission && permission.role === 'author' && permission.active) {
      documentAccess = 'edit';
    }
    
    if (permission && permission.role === 'reviewer' && permission.active) {
      documentAccess = 'review';
    }

    if (permissions[user.role] && permissions[user.role].document) {
      documentAccess = permissions[user.role].document;
    }

    return documentAccess;
  }
}

// class PemissionManager {
//   constructor(page, user, person) {
//     this.user === user;
//     this.permissions = person.permissions;
//   }

//   documentAccess () {
//     const participant = this.permissions.find(item => item.userId === this.user._id);

//     if (this.user.isSuper) return 'edit';

//     if (this.user.isAdmin) return 'view';

//     if (participant && participant.role === 'author' && participant.active) return 'edit';

//     if (participant && participant.role === 'reviewer' && participant.active) return 'comment';

//     return 'none';
//   }
// }