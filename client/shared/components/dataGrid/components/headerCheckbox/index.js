import React, { useRef, useEffect } from 'react';

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

export default HeaderCheckbox;
