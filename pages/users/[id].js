import React from 'react';
import { number } from 'prop-types';
import UserAPI from 'pages/User/api';
import UserPage from 'pages/User';
import WithError from 'shared/components/withError';
import logger from 'utils/logger';

const User = (props) => (
  <WithError statusCode={props.statusCode}>
    <UserPage {...props} />
  </WithError>
);

User.getInitialProps = async (ctx) => {
  const { query, req } = ctx;

  if (req && req.user && req.user.id === query.id) {
    return {
      currentUser: req.user
    };
  }

  try {
    const { data } = await UserAPI.getUser(query.id);
    return {
      currentUser: data
    };
  } catch (error) {
    logger.error(error);
    return {
      statusCode: (error.response && error.response.status) || 500
    };
  }
};

User.propTypes = {
  statusCode: number
};

User.defaultProps = {
  statusCode: null
};

export default User;
