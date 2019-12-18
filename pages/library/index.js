import React from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import { auth } from 'utils/auth';
import Layout from 'shared/components/layout';
import { actions } from 'pages/library/actions';
import { initialState } from 'pages/library/reducers';
import dynamic from 'next/dynamic'

const MediaLibrary = dynamic(
  () => import('../../client/shared/components/mediaLibrary'),
  { ssr: false }
)

const Library = () => {
  return (
    <div>
      <Head>
        <title>Media Library</title>
        <link rel='icon' href='/favicon.ico' />
        <script src="https://media-library.cloudinary.com/global/all.js" defer></script>
      </Head>

      <Layout activePage="Library">
        <Layout.Navbar>
          Library
        </Layout.Navbar>

        <Layout.Content maxHeight className="col-12 pt-3">
          <MediaLibrary inline />
        </Layout.Content>
      </Layout>
    </div>
  )
}

Library.getInitialProps = ({ ctx }) => {
  auth(ctx);
  const { store, isServer } = ctx;

  store.dispatch(actions.libraryInitialState(initialState));
  store.dispatch(actions.fetchMedia());

  return {
    isServer
  }
}

export default connect()(Library);
