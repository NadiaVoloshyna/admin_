import React, { useState } from 'react';
import { object, func, shape, arrayOf } from 'prop-types';
import Link from 'next/link';
import Dropdown from 'react-bootstrap/Dropdown';
import { UserType } from 'common/prop-types/authorization/user';
import ChangeRoleModal from 'shared/components/changeRoleModal';
import MenuItem from '../MenuItem';
import Avatar from '../../../../avatar';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <>
    <span
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </span>
  </>
));

CustomToggle.propTypes = {
  children: arrayOf(object).isRequired,
  onClick: func.isRequired
};

const UserDropdown = (props) => {
  const { user } = props;
  const [isChangeRoleModalOpen, setIsOpen] = useState(false);
  const toggleIsModalOpen = () => setIsOpen(!isChangeRoleModalOpen);

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}>
          <MenuItem
            text={`${user.firstName} ${user.lastName}`}
            hovered={false}
            variant="user"
          >
            <Avatar size="md" img="" />
          </MenuItem>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            onClick={toggleIsModalOpen}
            className="dropdown-item"
          >
            Change role
          </a>
          <Link href={`/users/${user.id}`}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="dropdown-item">
              Profile
            </a>
          </Link>
          <Link href="/auth/logout">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="dropdown-item">
              Logout
            </a>
          </Link>
        </Dropdown.Menu>
      </Dropdown>

      <ChangeRoleModal
        show={isChangeRoleModalOpen}
        toggleShow={toggleIsModalOpen}
        userId={user._id}
        userRole={user.role}
      />

      <style jsx>{`
        .user-icon {
          width: 40px;
          height: 40px;
          display: inline-block;
          background: #fff;
          text-align: center;
          padding-top: 5px;
        }
      `}</style>
    </div>
  );
};

UserDropdown.propTypes = {
  user: shape(UserType).isRequired
};

export default UserDropdown;
