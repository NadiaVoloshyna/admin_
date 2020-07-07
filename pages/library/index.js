import React from 'react';
import LibraryPage from 'pages/Library';
import WithError from 'shared/components/withError';

const Library = (props) => (
  <WithError statusCode={props.statusCode}>
    <LibraryPage {...props} />
  </WithError>
);

export default Library;
