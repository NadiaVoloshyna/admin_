const cloudinary = require('cloudinary').v2;
const request = require('request');

const config = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key:    process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
};

cloudinary.config(config);

module.exports = {
  createFolder: (name) => {
    return new Promise((resolve, reject) => {
      const options = {
        uri: `https://api.cloudinary.com/v1_1/${config.cloud_name}/folders/${name}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(name),
          'User-Agent': 'request',
        },
        auth: {
          user: config.api_key,
          pass: config.api_secret,
        },
      };

      request(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          resolve(JSON.parse(body));
        } else {
          reject();
        }
      });
    });
  },
};
