const cloudName = 'ukrainian';
const apiKey = '965542858113857';
const userName = 'uc2pac@gmail.com';

export const initMediaLibrary = (args) => {
  const { inline, containerId, onMediaSelect: insertHandler } = args;
  const options = {
    cloud_name: cloudName,
    api_key: apiKey,
    username: userName,
    remove_header: true,
  };

  if (inline && containerId) {
    options.inline_container = `#${containerId}`;
  }

  setTimeout(() => {
    window.ml = window.cloudinary.createMediaLibrary(options, { insertHandler });
    if (inline) {
      window.ml.show();
    }
  }, 100);
};
