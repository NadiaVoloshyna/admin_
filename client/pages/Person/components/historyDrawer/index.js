import React from 'react';
import { arrayOf, object, func, bool } from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import Drawer from 'shared/components/drawer';
import Activity from './activity';

const HistoryDrawer = (props) => {
  const {
    isOpen,
    onClose,
    activities,
  } = props;

  return (
    <Drawer open={isOpen} onClose={() => onClose(false)}>
      <Drawer.Header>
        Post history
      </Drawer.Header>
      <Drawer.Body noPadding>
        <ListGroup>
          { activities.map(item => <Activity key={item._id} activity={item} />)}
        </ListGroup>
      </Drawer.Body>
    </Drawer>
  );
};

HistoryDrawer.propTypes = {
  isOpen: bool,
  onClose: func.isRequired,
  activities: arrayOf(object).isRequired,
};

HistoryDrawer.defaultProps = {
  isOpen: false,
};

export default HistoryDrawer;
