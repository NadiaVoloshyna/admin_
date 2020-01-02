import React from 'react';
import Head from 'next/head';
import { connect, useSelector } from 'react-redux';
import { auth } from 'utils/auth';
import Layout from 'shared/components/layout';
import { actions as pageActions } from 'pages/library/actions';
import { initialState } from 'pages/library/reducers';
import Breadcrumbs from 'pages/library/components/breadcrumbs';
import NewAssetDropdown from 'pages/library/components/newAssetDropdown';
import FileSystem from 'pages/library/components/fileSystem';
import { getActiveFolder, constructBreadcrumbs } from 'pages/library/helpers';

const Library = () => {
  const { media, breadcrumbs, activeFolderId } = useSelector(state => {
    const { media, breadcrumbs } = state.library;
    const activeFolder = getActiveFolder(breadcrumbs);

    return {
      media, 
      breadcrumbs,
      activeFolderId: activeFolder ? activeFolder._id : null
    }
  });

  return (
    <div>
      <Head>
        <title>Media Library</title>
        <link rel='icon' href='/favicon.ico' />
        <script src="https://media-library.cloudinary.com/global/all.js" defer></script>
        <script src="https://widget.cloudinary.com/v2.0/global/all.js" defer></script>
      </Head>

      <Layout activePage="Library">
        <Layout.Navbar>
          <NewAssetDropdown activeFolderId={activeFolderId} />
        </Layout.Navbar>

        <Layout.Content maxHeight className="col-12 py-3">
          <Breadcrumbs breadcrumbs={breadcrumbs} />

          <FileSystem assets={media} />
        </Layout.Content>
      </Layout>
    </div>
  )
}

Library.getInitialProps = ({ ctx }) => {
  auth(ctx);
  const { store, isServer, query } = ctx;

  store.dispatch(pageActions.libraryInitialState({
    ...initialState,
    //breadcrumbs: constructBreadcrumbs(query.path)
  }));

  store.dispatch(pageActions.getAssets());

  return {
    isServer
  }
}

const mapDispatchToProps = {};

export default connect(
  null,
  mapDispatchToProps
)(Library);
