import React, { useEffect, useState } from 'react';
import { shape, func } from 'prop-types';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { applyBreadcrumbs } from 'shared/helpers';
import { AssetType } from '../../../prop-types';

const rootFolder = {
  name: 'Root',
  parent: null,
  _id: null,
  type: 'FOLDER'
};

const Breadcrumbs = ({ currentFolder, onCrumbClick, root }) => {
  const [ breadcrumbs, setBreadcrumbs ] = useState([]);

  useEffect(() => {
    if (currentFolder) {
      const crumbs = applyBreadcrumbs(breadcrumbs, currentFolder);
      setBreadcrumbs(crumbs);
    }
  }, [currentFolder]);

  return (
    <Breadcrumb>
      { [root, ...breadcrumbs].map(folder => {
        const isActive = (!currentFolder || folder._id === currentFolder._id);

        return (
          <Breadcrumb.Item
            href="#"
            onClick={() => onCrumbClick(folder)}
            key={folder._id}
            active={isActive}
          >{folder.name}</Breadcrumb.Item>
        );
      }) }
    </Breadcrumb>
  );
};

Breadcrumbs.propTypes = {
  currentFolder: shape(AssetType),
  onCrumbClick: func,
  root: shape(AssetType)
};

Breadcrumbs.defaultProps = {
  currentFolder: null,
  onCrumbClick: () => {},
  root: rootFolder
};

export default Breadcrumbs;
