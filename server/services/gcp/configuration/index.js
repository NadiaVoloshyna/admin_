const fs = require('fs');

const dotEnvExists = fs.existsSync('.env');

if (dotEnvExists) {
  console.info('configuration.js: .env already exists. Using development configuration');
  process.exit();
}

// GCP side
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucketName = `${process.env.GCLOUD_PROJECT}.appspot.com`;

storage
  .bucket(bucketName)
  .file('.env')
  .download({ destination: '.env' })
  .then(() => console.info('configuration.js: .env downloaded successfully'))
  .catch((e) => console.error(
    'configuration.js: there was an error downloading .env', 
    JSON.stringify(e, undefined, 2)
  ));