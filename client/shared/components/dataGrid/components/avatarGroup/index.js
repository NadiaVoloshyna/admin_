import React from 'react';
import { oneOf, shape, arrayOf } from 'prop-types';
import classnames from 'classnames';
import { UsersType } from 'shared/prop-types/';
import Avatar from 'shared/components/avatar';

import styles from './index.module.scss';

const AvatarGroup = (props) => {
  const users = Array.isArray(props.users)
    ? props.users
    : [props.users];

  const classes = classnames(
    styles.group,
    'd-flex',
  );

  if (users.length === 1) {
    return (
      <div className="d-flex align-items-center">
        <Avatar
          size="sm"
          image={users[0].image}
          className="mr-3"
        />
        <div>{users[0].fullName}</div>
      </div>
    );
  }

  return (
    <div className={classes}>
      { users.map(item => (
        <Avatar
          key={item.name}
          size="sm"
          image={item.image}
          popoverContent={item.fullName}
        />
      )) }
    </div>
  );
};

AvatarGroup.propTypes = {
  users: oneOf([
    shape(UsersType),
    arrayOf(shape(UsersType)),
  ]).isRequired,
};

export default AvatarGroup;
