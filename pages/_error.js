import React from 'react';
import { number } from 'prop-types';
import logger from 'utils/logger';

function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = (res && res.statusCode) || (err && err.statusCode) || 404;
  if (err) {
    logger.error(err);
  }

  return { statusCode };
};

Error.propTypes = {
  statusCode: number
};

Error.defaultProps = {
  statusCode: null
};

export default Error;
