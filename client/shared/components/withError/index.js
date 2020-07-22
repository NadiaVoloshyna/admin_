import React from 'react';
import { number, elementType } from 'prop-types';
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
  children: elementType.isRequired
};

export default WithError;
