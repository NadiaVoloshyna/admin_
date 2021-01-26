import React, { forwardRef } from 'react';
import { func } from 'prop-types';

const ElipsisDropdownToggle = forwardRef(({ onClick }, ref) => (
  <>
    <span
      className="toggle px-2"
      ref={ref}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e);
      }}
    >
      <i className="material-icons">
        more_vert
      </i>
    </span>
    <style jsx>{`
      .toggle {
        cursor: pointer;
        color: var(--gray);
      }

      .toggle:hover {
        opacity: .5;
      }
    `}</style>
  </>
));

ElipsisDropdownToggle.propTypes = {
  onClick: func.isRequired,
};

export default ElipsisDropdownToggle;
