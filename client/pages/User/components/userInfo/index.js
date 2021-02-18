import React from 'react';
import { func, shape } from 'prop-types';
import { UserType } from 'common/prop-types/authorization/user';
import Badge from 'react-bootstrap/Badge';
import Avatar from 'shared/components/avatar';

import styles from './index.module.scss';

const UserInfo = ({ user, onEdit }) => {
  const {
    fullName,
    role,
    email,
    createdAt,
    createdBy,
    image,
  } = user;

  let status = 'Active';
  let variant = 'success';

  if (!user.active) {
    status = 'Inactive';
    variant = 'gray';
  }

  return (
    <div className={`${styles.container} row no-gutters`}>
      <div className="col-2">
        <Avatar
          size="lg"
          sizeInitials="lginitials"
          image={image}
          onEdit={onEdit}
          fullName={fullName}
        />
      </div>
      <div>
        <Badge
          variant={variant}
          className="mb-4"
        >{ status }</Badge>

        <div className="d-flex">
          <ul className={`${styles.keys} list-unstyled`}>
            <li>Ім'я</li>
            <li>Роль</li>
            <li>Електронна адреса</li>
            <li>Дата запрошення</li>
            <li>Запросив</li>
          </ul>
          <ul className={`${styles.values} list-unstyled`}>
            <li>{ fullName }</li>
            <li>{ role }</li>
            <li>{ email }</li>
            <li>{ createdAt }</li>
            <li>{ createdBy }</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  user: shape(UserType).isRequired,
  onEdit: func.isRequired,
};

export default UserInfo;
