const cloudName = 'ukrainian';

export const createUploadWidget = (onSuccess, onError) => {
  // eslint-disable-next-line no-undef
  return cloudinary.createUploadWidget({
    cloudName,
    uploadPreset: 'v19o0vzg',
  }, (error, result) => {
    if (!error && result && result.event === 'success') {
      onSuccess(result.info);
    }

    if (error) onError(error);
  });
};
