import React from 'react';
import { number } from 'prop-types';
import UserAPI from 'pages/Users/api';
import UsersPage from 'pages/Users';
import WithError from 'shared/components/withError';
import logger from 'utils/logger';

const Users = (props) => (
  <WithError statusCode={props.statusCode}>
    <UsersPage {...props} />
  </WithError>
);

Users.getInitialProps = async (ctx) => {
  const { req, query } = ctx;

  try {
    const { data: { users, limit, total } } = await UserAPI
      .setCookie(req)
      .getUsers(query);

    return {
      users,
      pages: Math.ceil(total / limit),
    };
  } catch (error) {
    logger.error(error);
    return {
      statusCode: (error.response && error.response.status) || 500
    };
  }
};

Users.propTypes = {
  statusCode: number
};

Users.defaultProps = {
  statusCode: null
};

export default Users;
