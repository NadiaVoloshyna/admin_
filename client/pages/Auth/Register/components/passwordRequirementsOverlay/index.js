import React from 'react';
import Popover from 'react-bootstrap/Popover';

const PasswordRequirementsOverlay = () => {
  return (
    <Popover>
      <Popover.Content>
        Valid password must be
        <ul>
          <li>at least 8 characters long</li>
          <li>at most 18 characters long</li>
        </ul>
        Must have
        <ul>
          <li>at least one upper case letter</li>
          <li>at least one lower case letter</li>
          <li>at least one integer</li>
        </ul>
        Must contain
        <ul>
          <li>Must contain at least one of special characters</li>
        </ul>
        Allowed special characters are:
        {/* TODO: move to constants */}
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p><b>@ % + ' ! # $ & * ^ ? : . ( ) { } ~ - _ .</b></p>
      </Popover.Content>
    </Popover>
  );
};

export default PasswordRequirementsOverlay;
