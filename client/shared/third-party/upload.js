const cloudName = 'ukrainian';

let widjet;

export const createUploadWidget = (onSuccess, onError) => {
  return cloudinary.createUploadWidget({
      cloudName, 
      uploadPreset: 'v19o0vzg'
    }, (error, result) => { 
      if (!error && result && result.event === "success") { 
        onSuccess(result.info); 
      }

      if (error) onError(error);
    }
  );
}