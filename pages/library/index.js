import React from 'react';
import { number } from 'prop-types';
import LibraryPage from 'pages/Library';
import WithError from 'shared/components/withError';

const Library = (props) => (
  <WithError statusCode={props.statusCode}>
    <LibraryPage {...props} />
  </WithError>
);

Library.propTypes = {
  statusCode: number
};

Library.defaultProps = {
  statusCode: null
};

export default Library;
