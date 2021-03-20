import React, { useRef, useEffect } from 'react';
import { string } from 'prop-types';

const HeaderCheckbox = ({ mode, ...rest }) => {
  const checkboxRef = useRef();

  useEffect(() => {
    checkboxRef.current.indeterminate = rest.indeterminate;
  }, [rest.indeterminate]);

  return (
    <>
      <input type={ mode } { ...rest } ref={checkboxRef} />
      <label />
    </>
  );
};

HeaderCheckbox.propTypes = {
  mode: string.isRequired,
};

export default HeaderCheckbox;
