import React from 'react';
import { number, shape, string } from 'prop-types';
import Error from 'next/error';

const WithError = (props) => {
  const { children, statusCode, errorMessage } = props;

  if (statusCode) {
    return <Error statusCode={statusCode} title={errorMessage} />;
  }

  return children;
};

WithError.propTypes = {
  statusCode: number,
  errorMessage: string,
  children: shape({}).isRequired
};

export default WithError;
