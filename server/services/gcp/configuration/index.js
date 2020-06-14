const fs = require('fs');

const dotEnvExists = fs.existsSync('.env');

if (dotEnvExists) {
  process.exit();
}

// GCP side
const gcs = require('@google-cloud/storage');
const bucketName = `${process.env.GCLOUD_PROJECT}.appspot.com`;

gcs
  .bucket(bucketName)
  .file('.env')
  .download({ destination: '.env' })
  .then(() => console.info('app configuration.js: .env downloaded successfully'))
  .catch((e) => console.error(
    'app configuration.js: there was an error downloading .env', 
    JSON.stringify(e, undefined, 2)
  ));