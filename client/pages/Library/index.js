import React, { useState } from 'react';
import Head from 'next/head';
import { shape } from 'prop-types';
import useErrorHandler from 'shared/hooks/useErrorHandler';
import Layout from 'shared/components/layout';
import CreateAssetDropdown, { ASSET_TYPES } from 'shared/components/createAssetDropdown';
import { ERROR_MESSAGES } from 'shared/constants';
import AssetDetailsModal from 'pages/Library/components/assetDetailsModal';
import MediaLibrary from 'shared/components/mediaLibrary';
import Button from 'react-bootstrap/Button';
import { isOfType } from 'shared/helpers';
import { UserType } from 'common/prop-types/authorization/user';
import api from 'pages/Library/api';

const supportedAssetTypes = [
  ASSET_TYPES.FOLDER,
  ASSET_TYPES.ALBUM,
  ASSET_TYPES.IMAGE,
  ASSET_TYPES.AUDIO
];

const LibraryPage = ({ user }) => {
  const handleError = useErrorHandler();

  const [isLoading, setIsLoading] = useState(false);
  const [ selectedAsset, setSelectedAsset ] = useState(null);
  const [ currentFolder, setCurrentFolder ] = useState(null);
  const [ newAsset, setNewAsset ] = useState(null);
  const [ isShow, setIsShow ] = useState(false);
  const [ isUploadBoxOpen, setIsUploadBoxOpen ] = useState(false);

  const onAssetSelect = (asset) => {
    const { isFolder } = isOfType(asset.type);

    if (isFolder) {
      setCurrentFolder(asset);
    } else {
      setSelectedAsset(asset);
      setIsShow(true);
    }
  };

  const onAssetCreate = async (asset) => {
    setIsLoading(true);

    try {
      if (currentFolder) {
        asset.parent = currentFolder._id;
      }

      const { data: newAsset } = await api.createAsset(asset);

      setNewAsset(newAsset);
    } catch (error) {
      handleError(error, ERROR_MESSAGES.LIBRARY_CREATE_ASSET);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleUploadBox = () => {
    setIsUploadBoxOpen(!isUploadBoxOpen);
  };

  return (
    <>
      <Head>
        <title>Media Library</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://media-library.cloudinary.com/global/all.js" defer />
        <script src="https://widget.cloudinary.com/v2.0/global/all.js" defer />
      </Head>

      <Layout activePage="Library">
        <Layout.Navbar className="mb-3">
          { user.create('assets')
            && (
            <>
              <CreateAssetDropdown
                onAssetCreate={onAssetCreate}
                supportedTypes={supportedAssetTypes}
              />
              <Button onClick={toggleUploadBox}>Upload</Button>
            </>
            )}
        </Layout.Navbar>

        <Layout.Content isLoading={isLoading}>
          <MediaLibrary
            canDelete={user.delete('assets')}
            onAssetSelect={onAssetSelect}
            newAsset={newAsset}
            isDragDrop
            isUploadBoxOpen={isUploadBoxOpen}
          />
        </Layout.Content>
      </Layout>

      { selectedAsset
        && (
        <AssetDetailsModal
          item={selectedAsset}
          show={isShow}
          setShow={setIsShow}
        />
        )}
    </>
  );
};

LibraryPage.propTypes = {
  user: shape(UserType).isRequired,
};

export default LibraryPage;
