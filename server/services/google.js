const { google } = require('googleapis');
const eachSeries = require('async/eachSeries');
const credentials = require('../../config/googleapi.json');

const SCOPES = [
  'https://www.googleapis.com/auth/drive'
];

const ROOT_FOLDER = credentials.root_folder_id;

const auth = new google.auth.JWT(
  credentials.client_email, null,
  credentials.private_key, SCOPES
);

const drive = google.drive({ version: 'v3', auth });

module.exports = {
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

  listAllFiles: async () => {
    drive.files.list({
      q: `'${ROOT_FOLDER}' in parents`
    }, (err, res) => {
      if (err) throw err;
      const files = res.data.files;
      if (files.length) {
      files.map(async (file) => {
        console.log(file);
      });
      } else {
        console.log('No files found');
      }
    });
  }
}