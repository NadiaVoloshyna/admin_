import React, { useState } from 'react';
import { shape, object, func, number } from 'prop-types';
import Card from 'react-bootstrap/Card';
import AssetsGrid from 'shared/components/mediaLibrary/assetsGrid';
import { AssetType } from 'shared/prop-types';
import ProfessionModal from '../professionModal';
import Header from './header';

const ProfessionSectionBody = ({ input, rootFolder, professionIdx, onRemove }) => {
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
          idx={professionIdx}
          active={active}
          onModalOpen={setIsOpen}
          updateActive={updateActive}
          onRemove={onRemove}
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
  input: shape(object).isRequired,
  professionIdx: number.isRequired,
  rootFolder: shape(AssetType),
  onRemove: func,
};

ProfessionSectionBody.defaultProps = {
  rootFolder: null,
  onRemove: () => {},
};

export default ProfessionSectionBody;
