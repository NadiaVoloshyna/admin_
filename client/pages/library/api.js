import ApiService from 'shared/api';
import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core';

export const url = (publicId, options) => {
  const scOptions = Util.withSnakeCaseKeys(options);
  const cl = CoreCloudinary.new();
  return cl.url(publicId, scOptions);
};

const options = {
  cloudName: 'ukrainian',
  format: 'json',
  type: 'list',
  version: Math.ceil(new Date().getTime() / 1000),
};

const urlPath = url('sample', options);

class MediaApi extends ApiService {
  fetchMedia = () => {
    return this.get(urlPath, null, null);
  }
}

export default new MediaApi();