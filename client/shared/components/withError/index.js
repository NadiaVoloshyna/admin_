import React from 'react';
import Error from 'next/error';

const WithError = (props) => {
  const { children, statusCode } = props;

  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }

  return children;
};

export default WithError;
