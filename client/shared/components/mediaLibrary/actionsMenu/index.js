import React from 'react';
import { func, bool } from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import ElipsisToggle from 'shared/components/elipsisDropdownToggle';

const ActionsMenu = (props) => {
  const {
    onDelete,
    canDelete,
  } = props;

  return (
    <span className="actions-menu">
      <Dropdown>
        <Dropdown.Toggle as={ElipsisToggle} />

        <Dropdown.Menu>
          <Dropdown.Item>
            Move to
          </Dropdown.Item>

          <Dropdown.Item>
            Copy
          </Dropdown.Item>

          <Dropdown.Item
            disabled={!canDelete}
            onClick={onDelete}
          >
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <style jsx>{`
        .actions-menu {
          display: none;
          position: absolute;
          bottom: 5px;
          right: 0;
        }
      `}</style>
    </span>
  );
};

ActionsMenu.propTypes = {
  onDelete: func,
  canDelete: bool,
};

ActionsMenu.defaultProps = {
  onDelete: () => {},
  canDelete: false,
};

export default ActionsMenu;
