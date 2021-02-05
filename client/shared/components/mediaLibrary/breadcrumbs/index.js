import React from 'react';
import { shape, arrayOf, string } from 'prop-types';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import useListDataFetch from 'shared/hooks/useListDataFetch';
import { AssetType } from '../../../prop-types';

const rootFolder = {
  name: 'Root',
  parent: null,
  _id: null,
  type: 'FOLDER',
};

const Breadcrumbs = ({ breadcrumbs = [], root }) => {
  const { addQueryParams, removeQueryParam } = useListDataFetch();

  const onCrumbClick = (id) => {
    if (id) {
      addQueryParams('path', id);
    } else {
      removeQueryParam('path');
    }
  };

  return (
    <Breadcrumb>
      { [root, ...breadcrumbs].map((item, index) => {
        const isCurrent = (index === breadcrumbs.length);
        const onClick = () => {
          if (!isCurrent) {
            onCrumbClick(item._id);
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
};

Breadcrumbs.defaultProps = {
  breadcrumbs: [],
  root: rootFolder,
};

export default Breadcrumbs;
