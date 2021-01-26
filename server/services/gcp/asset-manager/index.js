const { Storage } = require('@google-cloud/storage');
const cryptoRandomString = require('crypto-random-string');

class AssetManager {
  constructor() {
    this.fileCacheMaxAge = 60 * 60 * 24 * 365;

    this.getStorage();
    this.getBucket();
  }

  getStorage() {
    this.storage = new Storage({
      credentials: {
        client_email: process.env.GOOGLE_STORAGE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_STORAGE_CLIENT_PRIVATE_KEY,
      },
    });
  }

  getBucket() {
    this.bucket = this.storage.bucket(process.env.ASSETS_BUCKET_NAME);
  }

  /**
   * Asset upload
   * @param {Buffer} data - binary file data
   * @param {String} contentType - file mimetype
   *
   * @returns {Promise} - object containing:
   * @property {String} objectName - storage object name
   */

  upload(data, contentType) {
    const objectName = cryptoRandomString({ length: 35 });
    const options = {
      cacheControl: `public, max-age=${this.fileCacheMaxAge}`,
      contentType,
    };

    const file = this.bucket.file(objectName);

    return file.save(data, options).then(() => ({ objectName }));
  }

  /**
   * Asset delete
   * @param {String} objectName - storage object name
   *
   * @returns {Promise}
   */

  delete(objectName) {
    return this.bucket.file(objectName).delete();
  }
}

module.exports = new AssetManager();
