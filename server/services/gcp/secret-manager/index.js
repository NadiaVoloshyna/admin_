const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

class SecretManager {
  constructor () {
    this.secretManagerServiceClient = new SecretManagerServiceClient();

    this.GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;
  }

  async getSecret (secret, version = 'latest') {
    const [vs] = await this.secretManagerServiceClient.accessSecretVersion({
      name: `project/${this.GOOGLE_CLOUD_PROJECT}/secrets/${secret}/versions/${version}`
    });

    return vs.payload.data.toString('utf8');
  }
}

module.exports = new SecretManager();