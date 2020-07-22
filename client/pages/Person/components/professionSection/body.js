import React, { useState } from 'react';
import { shape } from 'prop-types';
import Card from 'react-bootstrap/Card';
import { FieldRenderProps } from 'react-final-form';
import AssetsGrid from 'shared/components/mediaLibrary/assetsGrid';
import { AssetType } from 'shared/prop-types';
import ProfessionModal from '../professionModal';
import Header from './header';

const ProfessionSectionBody = ({ input, rootFolder }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const { onChange, value } = input;
  const { profession: { name }, media, active } = value;
  const hasMedia = media && media.length > 0;

  const onSelect = (assets) => {
    onChange({
      ...value,
      media: assets
    });
  };

  const updateActive = () => {

  };

  return (
    <>
      <Card className="mb-3">
        <Header
          name={name}
          active={active}
          onModalOpen={setIsOpen}
          updateActive={updateActive}
        />

        <Card.Body>
          { hasMedia
            && (
            <AssetsGrid
              assets={media}
              onSelect={() => {}}
              onDelete={() => {}}
              canDelete={false}
            />
            )}

          { !hasMedia
            && <p>No assets. Change text in the future</p>}
        </Card.Body>
      </Card>

      <ProfessionModal
        rootFolder={rootFolder}
        onAssetSelect={onSelect}
        onModalToggle={setIsOpen}
        isOpen={isOpen}
      />
    </>
  );
};

ProfessionSectionBody.propTypes = {
  input: shape(FieldRenderProps).isRequired,
  rootFolder: shape(AssetType)
};

ProfessionSectionBody.defaultProps = {
  rootFolder: null
};

export default ProfessionSectionBody;
