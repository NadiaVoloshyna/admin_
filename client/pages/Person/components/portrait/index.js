import React from 'react';
import { shape, object } from 'prop-types';
import { Field } from 'react-final-form';
import MediaLibraryModal from 'shared/components/mediaLibraryModal';
import { Image } from 'cloudinary-react';
import { encodePortrait } from '../../../../shared/helpers';
import decodePortrait from '../../../../shared/helpers/decodePortrait';

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
                onChange(encodePortrait(asset));
              });

              if (value) {
                return (
                  <Image
                    cloudName="ukrainian"
                    publicId={decodePortrait(value).url}
                    height="235"
                    crop="fill"
                  />
                );
              }

              return <MediaLibraryModal onAssetSelect={onSelect} />;
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
  );
};

PersonPortrait.propTypes = {
  input: shape(object).isRequired
};

export default PersonPortrait;
