import React, { useState, useEffect } from 'react';
import { func, string } from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ERROR_MESSAGES } from 'shared/constants';
import Loader from 'shared/components/loader';
import useErrorHandler from 'shared/hooks/useErrorHandler';
import LibraryApi from 'pages/Library/api';
import Breadcrumbs from 'shared/components/mediaLibrary/breadcrumbs';
import FileSystem from 'shared/components/mediaLibrary/fileSystem';
import { isOfType } from 'shared/helpers';

import styles from './index.module.scss';

const MediaLibraryModal = ({ onAssetSelect, rootAssetId }) => {
  const handleError = useErrorHandler();
  const [ isOpen, setIsOpen ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ assets, setAssets ] = useState([]);
  const [ breadcrumbs, setBreadcrumbs ] = useState([]);

  const toggleIsOpen = () => setIsOpen(!isOpen);

  // Fetch assets and breadcrumbs
  const onInit = async (assetId) => {
    setIsLoading(true);
    const query = {};

    if (assetId) {
      query.path = assetId;
    }

    const promises = [
      LibraryApi.getAssets(query),
    ];

    if (assetId) {
      promises.push(LibraryApi.getBreadcrumbs(assetId));
    }

    Promise.all(promises)
      .then(([assetsResponse, breadcrumbsResponse]) => {
        setAssets(assetsResponse.data);
        setBreadcrumbs(breadcrumbsResponse ? breadcrumbsResponse.data : []);
      })
      .catch((error) => handleError(error, ERROR_MESSAGES.PERSON_FETCH_ASSETS_FAILED))
      .finally(() => setIsLoading(false));
  };

  const onCrumbClick = (id) => {
    onInit(id);
  };

  /**
   * Fetches assets and breadcrumbs when modal is open
   */
  useEffect(() => {
    if (isOpen) {
      (() => onInit(rootAssetId))();
    }
  }, [isOpen]);

  /**
   * If image sends it to the parent, otherwise treats it as a folder
   * @param {Object} asset Selected asset
   */
  const onSelect = (asset) => {
    const { isImage } = isOfType(asset.type);

    if (isImage) {
      setIsOpen(!isOpen);
      onAssetSelect(asset);
    } else {
      onInit(asset._id);
    }
  };

  return (
    <>
      <Button variant="outline-secondary" onClick={toggleIsOpen}>
        Select Image
      </Button>

      <Modal
        show={isOpen}
        onHide={toggleIsOpen}
        size="lg"
        className={styles.modal}
      >
        <Modal.Header>
          <Breadcrumbs
            breadcrumbs={breadcrumbs}
            onCrumbClick={onCrumbClick}
          />
        </Modal.Header>
        <Modal.Body>
          <Loader isLoading={isLoading} />

          { !!assets.length && !isLoading && (
            <FileSystem
              assets={assets}
              onSelect={onSelect}
            />
          )}

          { !assets.length && !isLoading && (
            <>
              <h4 className="mt-5">No files in this folder</h4>
              <i className={`material-icons ${styles.noImageIcon}`}>insert_photo</i>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

MediaLibraryModal.propTypes = {
  onAssetSelect: func.isRequired,
  rootAssetId: string.isRequired,
};

export default MediaLibraryModal;
