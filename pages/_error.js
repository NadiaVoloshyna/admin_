import React from 'react';
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

export default Error;
