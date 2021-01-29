import React from 'react';
import Head from 'next/head';
import { number } from 'prop-types';
import LibraryPage from 'pages/Library';
import WithError from 'shared/components/withError';

const Library = (props) => (
  <WithError statusCode={props.statusCode}>
    <Head>
      <title>Media Library</title>
      <link rel="icon" href="/favicon.ico" />
      <script src="https://media-library.cloudinary.com/global/all.js" defer />
      <script src="https://widget.cloudinary.com/v2.0/global/all.js" defer />
    </Head>
    <LibraryPage {...props} />
  </WithError>
);

Library.propTypes = {
  statusCode: number,
};

Library.defaultProps = {
  statusCode: null,
};

export default Library;
