import React from 'react';
import classnames from 'classnames';
import { string, bool } from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';

import styles from './index.module.scss';

const Loader = ({ className, isLoading }) => {
  if (!isLoading) return null;

  const containerCN = classnames(
    styles.loader,
    'shadow-lg text-primary',
    className,
  );

  return (
    <div className={containerCN}>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

Loader.propTypes = {
  className: string,
  isLoading: bool,
};

Loader.defaultProps = {
  className: '',
  isLoading: false,
};

export default Loader;
