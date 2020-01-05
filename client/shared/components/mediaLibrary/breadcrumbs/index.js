import React, { useEffect, useState } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { applyBreadcrumbs } from 'shared/helpers';

const root = {
  name: 'Root',
  parent: null,
  _id: null,
  type: 'folder'
}

const Breadcrumbs = ({ currentFolder, onCrumbClick }) => {
  const [ breadcrumbs, setBreadcrumbs ] = useState([]);

  useEffect(() => {
    if (currentFolder) {
      const crumbs = applyBreadcrumbs(breadcrumbs, currentFolder);
      setBreadcrumbs(crumbs)
    }
  }, [currentFolder]);

  return (
    <Breadcrumb>
      { [root, ...breadcrumbs].map(folder => {
        const isActive = (!!currentFolder && folder._id === currentFolder._id);
        
        return (
          <Breadcrumb.Item 
            href="#"
            onClick={() => onCrumbClick(folder)}
            key={folder._id}
            active={isActive}
          >{folder.name}</Breadcrumb.Item>
        )
      }) }
    </Breadcrumb>
  )
}

export default Breadcrumbs;
