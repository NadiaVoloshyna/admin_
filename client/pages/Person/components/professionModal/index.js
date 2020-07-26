import React, { useState } from 'react';
import { bool, func, shape } from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MediaLibrary from 'shared/components/mediaLibrary';
import FileSystem from 'shared/components/mediaLibrary/fileSystem';
import { AssetType } from 'shared/prop-types';
import Breadcrumbs from 'shared/components/mediaLibrary/breadcrumbs';
import { isOfType } from 'shared/helpers';

const ProfessionModal = ({ rootFolder, onAssetSelect, isOpen, onModalToggle }) => {
  const [ showModal, setShowModal ] = useState(false);
  const [ currentFolder ] = useState(null);
  const [ assets, setAssets ] = useState([]);

  // Update showModal on siOpen prop update
  React.useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    onModalToggle(false);
  };

  const closeModalAndSave = () => {
    onModalToggle(false);
    onAssetSelect(assets);
  };

  const onMLAssetSelect = (asset) => {
    const { isFolder } = isOfType(asset.type);
    const hasBeenSelected = assets.some(item => item._id === asset._id);

    if (!isFolder && !hasBeenSelected) {
      setAssets([...assets, asset]);
    }
  };

  const onPersonMLDelete = (asset) => {
    const assetsCopy = [...assets];
    const index = assetsCopy.findIndex(item => item._id === asset._id);

    assetsCopy.splice(index, 1);

    setAssets(assetsCopy);
  };

  return (
    <Modal
      dialogClassName="w-100 mw-100"
      show={showModal}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Select assets</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col md={6}>
            <Breadcrumbs
              currentFolder={currentFolder}
              onCrumbClick={() => {}}
            />
            <FileSystem
              assets={assets}
            // onSelect={onSelect}
              onDelete={onPersonMLDelete}
            />
          </Col>
          <Col md={6}>
            <MediaLibrary
              onAssetSelect={onMLAssetSelect}
              root={rootFolder}
            />
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Discard</Button>
        <Button variant="success" onClick={closeModalAndSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

ProfessionModal.propTypes = {
  rootFolder: shape(AssetType),
  onAssetSelect: func,
  isOpen: bool,
  onModalToggle: func.isRequired
};

ProfessionModal.defaultProps = {
  rootFolder: null,
  onAssetSelect: () => {},
  isOpen: false
};

export default ProfessionModal;
