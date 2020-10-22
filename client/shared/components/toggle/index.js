import React from 'react';
import { string, bool, func } from 'prop-types';

const Toggle = ({ id, checked, onChange, disabled, label }) => {
  return (
    <span className="toggle">
      <input
        type="checkbox"
        defaultChecked={checked}
        onChange={onChange}
        className="toggle"
        id={id}
        name={id}
        disabled={disabled}
      />
      <label htmlFor={id}>{label}</label>
    </span>
  );
};

Toggle.propTypes = {
  id: string.isRequired,
  checked: bool,
  onChange: func,
  disabled: bool,
  label: string,
};

Toggle.defaultProps = {
  checked: false,
  onChange: () => {},
  disabled: false,
  label: '',
};

export default Toggle;
