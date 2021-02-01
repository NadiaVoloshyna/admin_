import React, { useState, useRef } from 'react';
import { shape, object, func } from 'prop-types';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/Overlay';

const AttributesTooltip = (props) => {
  const {
    permission,
    onEditClick,
  } = props;

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const { attributes } = permission;

  const showPopover = (event) => {
    setShow(true);
    setTarget(event.target);
  };

  const hidePopover = () => {
    setShow(false);
  };

  const handleEditClick = () => {
    hidePopover();
    onEditClick(permission);
  };

  return (
    <div>
      <Button
        variant="link"
        size="sm"
        onMouseOver={showPopover}
        onFocus={showPopover}
        onMouseOut={hidePopover}
        onBlur={hidePopover}
        onClick={handleEditClick}
      >
        attrs
      </Button>

      <Overlay
        show={show}
        target={target}
        placement="top"
        container={ref.current}
        containerPadding={20}
      >
        <Popover>
          <Popover.Title as="h3">Attributes for:</Popover.Title>
          <Popover.Content>
            <div>
              <ul className="pl-4 m-0">
                { attributes.map(item => (
                  <li key={item}>{ item }</li>
                )) }
              </ul>
            </div>
          </Popover.Content>
        </Popover>
      </Overlay>
    </div>
  );
};

AttributesTooltip.propTypes = {
  permission: shape(object).isRequired,
  onEditClick: func.isRequired,
};

export default AttributesTooltip;
