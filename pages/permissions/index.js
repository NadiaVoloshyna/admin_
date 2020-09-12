import React from 'react';
import { number } from 'prop-types';
import PermissionsPage from 'pages/Permissions';
import WithError from 'shared/components/withError';
import PermissionsAPI from 'pages/Permissions/api';
import logger from 'utils/logger';

const Permissions = (props) => (
  <WithError statusCode={props.statusCode}>
    <PermissionsPage {...props} />
  </WithError>
);

Permissions.getInitialProps = async (ctx) => {
  const { req } = ctx;

  try {
    const { data: permissions } = await PermissionsAPI
      .setCookie(req)
      .getPermissions();

    return {
      permissions
    };
  } catch (error) {
    logger.error(error);
    return {
      statusCode: (error.response && error.response.status) || 500
    };
  }
};

Permissions.propTypes = {
  statusCode: number
};

Permissions.defaultProps = {
  statusCode: null
};

export default Permissions;
