import React from 'react';
import Head from 'next/head';
import { number } from 'prop-types';
import LibraryPage from 'pages/Library';
import LibraryApi from 'pages/Library/api';
import WithError from 'shared/components/withError';
import logger from 'utils/logger';

const Library = (props) => (
  <WithError statusCode={props.statusCode}>
    <Head>
      <title>Media Library</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <LibraryPage {...props} />
  </WithError>
);

Library.getInitialProps = async (ctx) => {
  const { req, query } = ctx;
  let breadcrumbs = [];

  try {
    // TODO: use Promise.all to send it in paralell
    const { data: assets } = await LibraryApi
      .setCookie(req)
      .getAssets(query);

    if (query.path) {
      const { data } = await LibraryApi
        .setCookie(req)
        .getBreadcrumbs(query.path);

      breadcrumbs = data;
    }

    return {
      assets,
      breadcrumbs,
      currentFolderId: query.path,
    };
  } catch (error) {
    logger.error(error);
    return {
      statusCode: (error.response && error.response.status) || 500,
    };
  }
};

Library.propTypes = {
  statusCode: number,
};

Library.defaultProps = {
  statusCode: null,
};

export default Library;
