import React from 'react';
import { func, arrayOf, shape } from 'prop-types';
import Select from 'react-select';
import { UserType } from 'common/prop-types/authorization/user';
import Avatar from 'shared/components/avatar';

const UserSelect = ({ users, onChange, defaultValue }) => {
  /* eslint-disable */
  const Option = ({ data, innerProps }) => {
    return (
      <div className="d-flex align-items-center" { ...innerProps }>
        <Avatar image={data.image} className="mx-4 my-2" />
        <span>{ data.label }</span>
      </div>
    );
  };
  /* eslint-enable */

  return (
    <Select
      isMulti
      isClearable={false}
      options={users}
      defaultValue={defaultValue}
      onChange={onChange}
      menuPlacement="auto"
      components={{
        Option,
      }}
      styles={{
        control: styles => ({ ...styles, border: 'none' }),
      }}
    />
  );
};

UserSelect.propTypes = {
  users: arrayOf(shape(UserType)).isRequired,
  onChange: func.isRequired,
  defaultValue: arrayOf(shape(UserType)),
};

UserSelect.defaultProps = {
  defaultValue: null,
};

export default UserSelect;
