import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MediaLibrary from 'shared/components/mediaLibrary';
import FileSystem from 'shared/components/mediaLibrary/fileSystem';
import Breadcrumbs from 'shared/components/mediaLibrary/breadcrumbs';
import CreateAssetDropdown, { ASSET_TYPES } from 'pages/library/components/createAssetDropdown';
import { isOfType } from 'shared/helpers';

const supportedAssetTypes = [
  ASSET_TYPES.ALBUM
];

const ProfessionModal = () => {
  const [ showModal, setShowModal ] = useState(false);
  const [ currentFolder, setCurrentFolder ] = useState(null);
  const [ assets, setAssets ] = useState([]);

  const handleClose = () => {
    setShowModal(false);
  };
  
  const onMLAssetSelect = (asset) => {
    const { isFolder } = isOfType(asset.type);
    const hasBeenSelected = assets.some(item => item._id === asset._id);

    if (!isFolder && !hasBeenSelected) {
      setAssets([...assets, asset]);
    }

    if (isFolder) {
      setCurrentFolder(asset);
    }
  }

  const onPersonMLDelete = (asset) => {
    const assetsCopy = [...assets];
    const index = assetsCopy.findIndex(item => item._id === asset._id);

    assetsCopy.splice(index, 1);

    setAssets(assetsCopy);
  }

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>Add content</Button>

      <Modal 
        size="xl"
        show={showModal} 
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <CreateAssetDropdown supportedTypes={supportedAssetTypes} />
          </Modal.Title>
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
              inline
              // onSelect={onSelect}
              onDelete={onPersonMLDelete}
            />
            </Col>
            <Col md={6}>
              <MediaLibrary onAssetSelect={onMLAssetSelect} />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Discard</Button>
          <Button variant="success" onClick={handleClose}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProfessionModal;
