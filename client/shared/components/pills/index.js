import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import cx from 'classnames';
import { func, arrayOf, string, bool } from 'prop-types';

import styles from './index.module.scss';

const Pills = (props) => {
  const { items, onSelect, selected, wide, className } = props;
  const defaultKey = selected || items[0];
  const [active, setActive] = useState(defaultKey);

  const classnames = cx(
    wide && styles.wide,
    className,
  );

  const onClick = (item) => {
    if (active !== item) {
      onSelect(item);
      setActive(item);
    }
  };

  return (
    <Nav variant="pills" defaultActiveKey={defaultKey} className={classnames}>
      { items.map(item => {
        return (
          <Nav.Item key={item} onClick={() => onClick(item)}>
            <Nav.Link eventKey={item}>{item}</Nav.Link>
          </Nav.Item>
        );
      })}
    </Nav>
  );
};

Pills.propTypes = {
  items: arrayOf(string).isRequired,
  onSelect: func.isRequired,
  selected: string,
  className: string,
  wide: bool,
};

Pills.defaultProps = {
  selected: null,
  className: '',
  wide: false,
};

export default Pills;
