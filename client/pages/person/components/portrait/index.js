import React from 'react';
import _unescape from 'lodash/unescape';
import { Field } from 'react-final-form';
import MediaLibraryModal from 'shared/components/mediaLibraryModal';
import { Image } from 'cloudinary-react';

const PersonPortrait = () => {

  return (
    <>
      <div className="card mb-3">
        <div className="card-header">
          Portraits
        </div>

        <div className="portrait card-body"> 
          <Field name="portrait">
            {props => {
              const { input: { onChange, value } } = props;
              const onSelect = (asset => {
                onChange(asset.url);
              });

              if (value) {
                return <Image
                  cloudName="ukrainian" 
                  publicId={value}
                  height="235"
                  crop="fill" 
                />
              }

              return <MediaLibraryModal onAssetSelect={onSelect} />
            }}
          </Field>
        </div>
      </div>

      <style global jsx>{`
        .portrait {
          height: 276px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .portrait img {
          max-height: 100%;
          max-width: 100%;
        }
      `}</style>
    </>
  )
}

export default PersonPortrait;
