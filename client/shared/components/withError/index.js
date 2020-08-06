import React from 'react';
import { number, shape } from 'prop-types';
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
  children: shape({}).isRequired
};

export default WithError;
