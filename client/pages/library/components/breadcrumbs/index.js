import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from 'pages/library/actions';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { getActiveFolder } from 'pages/library/helpers';

const Breadcrumbs = ({ breadcrumbs }) => {
  const dispatch = useDispatch();
  const active = getActiveFolder(breadcrumbs);

  const root = {
    name: 'Root',
    parent: null,
    _id: null
  }

  const onClick = (item) => {
    dispatch(actions.applyBreadcrumbs(item));
    dispatch(actions.getAssets(item._id));
  }

  return (
    <Breadcrumb>
      { [root, ...breadcrumbs].map(folder => {
        const isActive = (!!active && folder._id === active._id);
        
        return (
          <Breadcrumb.Item 
            href="#"
            onClick={() => onClick(folder)}
            key={folder._id}
            active={isActive}
          >{folder.name}</Breadcrumb.Item>
        )
      }) }
    </Breadcrumb>
  )
}

export default Breadcrumbs;
