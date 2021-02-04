import React, { useState, useEffect } from 'react';
import { shape, arrayOf, string } from 'prop-types';
import useErrorHandler from 'shared/hooks/useErrorHandler';
import useListDataFetch from 'shared/hooks/useListDataFetch';
import Layout from 'shared/components/layout';
import { ERROR_MESSAGES, PAGE_NAMES } from 'shared/constants';
import AssetDetailsModal from 'pages/Library/components/assetDetailsModal';
import MediaLibrary from 'shared/components/mediaLibrary';
import SearchField from 'shared/components/searchField';
import Filters from 'shared/components/filters';
import { isOfType } from 'shared/helpers';
import { UserType } from 'common/prop-types/authorization/user';
import { AssetType } from 'shared/prop-types';
import api from 'pages/Library/api';
import FilterDrawer from './components/filterDrawer';
import CreateAssetDrawer from './components/createAssetDrawer';

const LibraryPage = (props) => {
  const { user, breadcrumbs, currentFolderId } = props;

  const handleError = useErrorHandler();
  const { addQueryParams } = useListDataFetch();

  const [ assets, setAssets ] = useState(props.assets);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ selectedAsset, setSelectedAsset ] = useState(null);
  const [ isShow, setIsShow ] = useState(false);

  useEffect(() => {
    setAssets(props.assets);
  }, [props.assets]);

  const onSelect = (asset) => {
    const { isFolder, isAlbum } = isOfType(asset.type);

    if (isFolder || isAlbum) {
      addQueryParams('path', asset._id);
    } else {
      setSelectedAsset(asset);
      setIsShow(true);
    }
  };

  const onCreate = async (asset) => {
    setIsLoading(true);

    try {
      if (currentFolderId) {
        asset.parent = currentFolderId;
      }

      const { data: newAsset } = await api.createAsset(asset);
      setAssets([...assets, newAsset]);
    } catch (error) {
      handleError(error, ERROR_MESSAGES.LIBRARY_CREATE_ASSET);
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async (asset) => {
    setIsLoading(true);

    try {
      await api.deleteAsset(asset._id);
      const newAssets = assets.filter(item => item._id !== asset._id);
      setAssets(newAssets);
    } catch (error) {
      handleError(error, ERROR_MESSAGES.LIBRARY_FILE_DELETE);
    } finally {
      setIsLoading(false);
    }
  };

  const onMove = async (asset, parent) => {
    setIsLoading(true);

    try {
      await api.moveAsset(asset._id, parent._id);
      const newAssets = assets.filter(item => item._id !== asset._id);
      setAssets(newAssets);
    } catch (error) {
      handleError(error, ERROR_MESSAGES.LIBRARY_FILE_MOVE);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Layout activePage={PAGE_NAMES.LIBRARY} user={user}>
        <Layout.Navbar className="mb-3">
          <h2>Library</h2>
          <div className="d-flex">
            <SearchField />
            <FilterDrawer />
          </div>
          { user.create('assets') && <CreateAssetDrawer onSubmit={onCreate} /> }
        </Layout.Navbar>

        <Layout.Content isLoading={isLoading}>
          <div className="mb-4">
            <Filters
              items={{
                all: 'All',
                my: 'My Assets',
                recent: 'Recent Files',
              }}
              name="files"
            />
          </div>

          <MediaLibrary
            assets={assets}
            breadcrumbs={breadcrumbs}
            canDelete={user.delete('assets')}
            onSelect={onSelect}
            onDelete={onDelete}
            onMove={onMove}
            isDragDrop
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
  assets: arrayOf(shape(AssetType)).isRequired,
  breadcrumbs: arrayOf(shape({
    _id: string,
    name: string,
  })).isRequired,
  currentFolderId: string.isRequired,
};

export default LibraryPage;
