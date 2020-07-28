import React from 'react';
import { number, object, shape } from 'prop-types';
import Error from 'next/error';

const WithError = (props) => {
  const { children, statusCode } = props;

  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }

  return children;
};

WithError.propTypes = {
  statusCode: number,
  children: shape(object)
};

export default WithError;
