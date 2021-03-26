import React from 'react';
import { shape, arrayOf, string, func, oneOf } from 'prop-types';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import useListDataFetch from 'shared/hooks/useListDataFetch';
import { AssetType } from '../../../prop-types';

const rootFolder = {
  name: 'Root',
  parent: null,
  _id: null,
  type: 'FOLDER',
};

const Breadcrumbs = ({ breadcrumbs = [], root, onCrumbClick }) => {
  const { toggleQueryParams } = useListDataFetch();

  const handleCrumbClick = (id) => {
    if (onCrumbClick) {
      return onCrumbClick(id);
    }
    toggleQueryParams({ path: id });
  };

  return (
    <Breadcrumb>
      { [root, ...breadcrumbs].map((item, index) => {
        const isCurrent = (index === breadcrumbs.length);
        const onClick = () => {
          if (!isCurrent) {
            handleCrumbClick(item._id);
          }
        };

        return (
          <Breadcrumb.Item
            href="#"
            onClick={onClick}
            key={item._id}
            active={isCurrent}
          >{item.name}</Breadcrumb.Item>
        );
      }) }
    </Breadcrumb>
  );
};

Breadcrumbs.propTypes = {
  breadcrumbs: arrayOf(shape({
    _id: string,
    name: string,
  })),
  root: shape(AssetType),
  onCrumbClick: oneOf([func, null]),
};

Breadcrumbs.defaultProps = {
  breadcrumbs: [],
  root: rootFolder,
  onCrumbClick: null,
};

export default Breadcrumbs;
