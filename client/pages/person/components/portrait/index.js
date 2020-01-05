import React, { useState } from 'react';
import _unescape from 'lodash/unescape';
import { Field } from 'react-final-form';
import Button from 'react-bootstrap/Button';
import MediaLibraryModal from 'shared/components/mediaLibraryModal';
import { Image, Transformation } from 'cloudinary-react';

const PersonPortrait = ({ portrait, name = '' }) => {
  const [image, setImage] = useState(_unescape(portrait).replace(/&#x2F;/g, '/'));

  return (
    <>
      <div className="card mb-3">
        <div className="card-header">
          Portraits
        </div>

        <div className="portrait card-body"> 
          <Field name="portrait">
            {props => {
              const onSelect = (asset => {
                props.input.onChange(asset.url);
                setImage(asset.url);
              });

              if (image) {
                return <Image
                  cloudName="ukrainian" 
                  publicId={image}
                  height="235"
                  crop="fill" 
                />
              }

              return (
                <MediaLibraryModal onAssetSelect={onSelect} />
              )
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
