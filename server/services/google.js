const { google } = require('googleapis');
const eachSeries = require('async/eachSeries');
const credentials = require('../../config/googleapi.json');

const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file'
];

const ROOT_FOLDER = credentials.root_folder_id;

const auth = new google.auth.JWT(
  credentials.client_email, null,
  credentials.private_key, SCOPES
);

const drive = google.drive({ version: 'v3', auth });

const GoogleApi = {
  createPermission: async (fileId, resource) => {
    return await drive.permissions.create({
      resource,
      fileId: fileId,
      fields: 'id',
    });
  },
  createDocument: async (title) => {
    return await drive.files.create({
      resource: {
        'name' : title,
        'mimeType' : 'application/vnd.google-apps.document',
        'parents':[ROOT_FOLDER]
      },
      fields: 'id'
    });
  },

  getDocumentContent: async (documentId) => {
    return await drive.files.export({
      fileId: documentId,
      mimeType: 'text/html'
    });
  },

  getFileMeta: async (fileId, fields) => {
    return await drive.files.get({ 
      fileId,
      fields: fields || 'lastModifyingUser,modifiedTime'
    });
  },

  deleteDocuments: (documentIds, callback) => {
    eachSeries(documentIds, (id, deleteCallback) => {
      drive.files.delete({ 
        fileId: id
      }, (err, res) => {
        if (err) {
          deleteCallback(err)
        } else {
          deleteCallback(null, res)
        }
      })
    }, callback);
  },

  createPermissions: (fileId, role, emailAddress) => {
    return drive.permissions.create({
      fileId,
      fields: 'id,emailAddress',
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
    })
  },

  /**
   * Updates file permissions. Sets a new role for one of its maintainers
   */
  updatePermissions: (fileId, permissionId, resource) => {
    return drive.permissions.update({
      fileId,
      permissionId,
      resource
    })
  },
}

module.exports = GoogleApi;