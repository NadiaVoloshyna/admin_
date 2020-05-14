import React, { useState, useContext } from 'react';
import Head from 'next/head';
import { UserContext } from 'shared/context';
import Layout from 'shared/components/layout';
import CreateAssetDropdown, { ASSET_TYPES } from 'shared/components/createAssetDropdown';
import AssetDetailsModal from 'pages/library/components/assetDetailsModal';
import MediaLibrary from 'shared/components/mediaLibrary';
import Button from 'react-bootstrap/Button';
import { isOfType } from 'shared/helpers';
import api from 'pages/library/api';

const supportedAssetTypes = [
  ASSET_TYPES.FOLDER,
  ASSET_TYPES.ALBUM,
  ASSET_TYPES.IMAGE,
  ASSET_TYPES.AUDIO
];

const LibraryPage = () => {
  const { user: { userRoleUp } } = useContext(UserContext);
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
  }

  const onAssetCreate = async (asset) => {
    if (currentFolder) {
      asset.parent = currentFolder._id;
    }

    const response = await api.createAsset(asset);
    const newAsset = await response.json();

    setNewAsset(newAsset);
  }

  const toggleUploadBox = () => {
    setIsUploadBoxOpen(!isUploadBoxOpen);
  }

  return (
    <>
      <Head>
        <title>Media Library</title>
        <link rel='icon' href='/favicon.ico' />
        <script src="https://media-library.cloudinary.com/global/all.js" defer></script>
        <script src="https://widget.cloudinary.com/v2.0/global/all.js" defer></script>
      </Head>

      <Layout activePage="Library">
        <Layout.Navbar className="mb-3">
          { userRoleUp('admin') &&
            <>
              <CreateAssetDropdown 
                onAssetCreate={onAssetCreate} 
                supportedTypes={supportedAssetTypes}
              />
              <Button onClick={toggleUploadBox}>Upload</Button>
            </>
          }
        </Layout.Navbar>

        <Layout.Content>
          <MediaLibrary
            canDelete={userRoleUp('admin')}
            onAssetSelect={onAssetSelect}
            newAsset={newAsset}
            isDragDrop={true}
            isUploadBoxOpen={isUploadBoxOpen}
          />
        </Layout.Content>
      </Layout>

      { selectedAsset &&
        <AssetDetailsModal 
          item={selectedAsset}
          show={isShow}
          setShow={setIsShow}
        />
      }
    </>
  )
}

export default LibraryPage;