import React from 'react';
import { number } from 'prop-types';
import { paginationState } from 'shared/state';
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
  const { req } = ctx;
  const { offset, searchTerm, sort } = paginationState;

  try {
    const { data: { users, pagination } } = await UserAPI
      .setCookie(req)
      .getUsers(offset, searchTerm, sort);

    return {
      users,
      pagination: { offset, searchTerm, sort, ...pagination }
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
