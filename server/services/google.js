const { google } = require('googleapis');

const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file'
];

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_DOC_CLIENT_EMAIL,
  key: process.env.GOOGLE_DOC_PRIVATE_KEY,
  scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

const GoogleApi = {
  createPermission: async (fileId, resource) => {
    return drive.permissions.create({
      resource,
      fileId,
      fields: 'id',
    });
  },
  createDocument: async (title) => {
    return drive.files.create({
      resource: {
        name : title,
        mimeType : 'application/vnd.google-apps.document',
        parents:[process.env.GOOGLE_DOC_ROOT_FOLDER_ID]
      },
      fields: 'id'
    });
  },

  getDocumentContent: async (documentId) => {
    return drive.files.export({
      fileId: documentId,
      mimeType: 'text/html'
    });
  },

  getFileMeta: async (fileId, fields) => {
    return drive.files.get({
      fileId,
      fields: fields || 'lastModifyingUser,modifiedTime'
    });
  },

  delete: (id) => {
    return drive.files.delete({
      fileId: id
    });
  },

  createPermissions: (fileId, role, emailAddress) => {
    return drive.permissions.create({
      fileId,
      fields: 'id,emailAddress,role',
      resource: {
        type: 'user',
        role,
        emailAddress
      }
    });
  },

  getPermissions: (fileId, permissionId) => {
    return drive.permissions.get({
      fileId,
      permissionId
    });
  },

  /**
   * Updates file permissions. Sets a new role for one of its maintainers
   */
  updatePermissions: (fileId, permissionId, role) => {
    return drive.permissions.update({
      fileId,
      permissionId,
      resource: { role }
    });
  },
};

module.exports = GoogleApi;
