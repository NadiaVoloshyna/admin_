import React from 'react';
import _upperFirst from 'lodash/upperFirst';
import Badge from 'react-bootstrap/Badge';
import cx from 'classnames';
import useListDataFetch from 'shared/hooks/useListDataFetch';
import { string } from 'prop-types';

import styles from './index.module.scss';

const SelectedFilters = (props) => {
  const { removeQueryParam, getQueryParams } = useListDataFetch();
  const { className } = props;
  const role = getQueryParams('role') || [];
  const roles = typeof role === 'string' ? role.split(',') : role;

  const classnames = cx(
    'd-flex align-items-center justify-content-center border bg-white ml-2',
    styles.badge,
    className,
  );

  if (!roles.length) return null;

  const onDelete = (value) => removeQueryParam('role', value);

  return (
    <div className="d-flex align-items-center">
      <span>Filter values:</span>
      { roles.map(item => {
        return (
          <Badge key={item} variant="light" className={classnames}>
            { _upperFirst(item) }
            <i className="material-icons ml-2 cur-pointer" onClick={() => onDelete(item)}>close</i>
          </Badge>
        );
      })}
    </div>
  );
};

SelectedFilters.propTypes = {
  className: string,
};

SelectedFilters.defaultProps = {
  className: '',
};

export default SelectedFilters;
