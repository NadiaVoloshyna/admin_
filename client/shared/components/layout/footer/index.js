import React from 'react';
import { string, arrayOf, oneOfType, node } from 'prop-types';
import cx from 'classnames';

import styles from './index.module.scss';

const LayoutFooter = (props) => {
  const footerCN = cx(
    'd-flex justify-content-between align-items-center',
    styles.footer,
    props.className,
  );

  return (
    <div className="row">
      <div className="col p-0">
        <div className={footerCN}>
          { props.children }
        </div>
      </div>
    </div>
  );
};

LayoutFooter.propTypes = {
  className: string,
  children: oneOfType([
    arrayOf(node),
    node,
  ]).isRequired,
};

LayoutFooter.defaultProps = {
  className: '',
};

export default LayoutFooter;
