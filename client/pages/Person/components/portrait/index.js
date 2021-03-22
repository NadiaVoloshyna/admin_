import React from 'react';
import getConfig from 'next/config';
import { shape, object, string } from 'prop-types';
import { Field } from 'react-final-form';
import MediaLibraryModal from 'shared/components/mediaLibraryModal';
import { decodePortrait, encodePortrait } from 'common/utils';

const { publicRuntimeConfig } = getConfig();
const IMAGE_URL = publicRuntimeConfig.assetsUrl;

const PersonPortrait = ({ rootAssetId }) => {
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
                const { url } = decodePortrait(value);
                return (
                  <img src={`${IMAGE_URL}${url}`} alt="img" />
                );
              }

              return (
                <MediaLibraryModal
                  rootAssetId={rootAssetId}
                  onAssetSelect={onSelect}
                />
              );
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
  input: shape(object).isRequired,
  rootAssetId: string.isRequired,
};

export default PersonPortrait;
