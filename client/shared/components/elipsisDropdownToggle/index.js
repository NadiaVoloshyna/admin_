import React, { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      <FontAwesomeIcon icon="ellipsis-v" />
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

export default ElipsisDropdownToggle;
