import React from 'react';
import { useDrop } from 'react-dnd';
import { ASSET_TYPES } from 'shared/constants';
import cx from 'classnames';

const getAcceptedTypes = (type) => {
  switch (type) {
    case ASSET_TYPES.FOLDER: {
      return Object.values(ASSET_TYPES);
    }

    case ASSET_TYPES.ALBUM: {
      return ASSET_TYPES.SONG;
    }

    default: {
      return [];
    }
  }
}

const DroppableAsset = (props) => {
  const { 
    item, 
    children,
    onDrop,
    isDragDrop = false
  } = props;

  const isDroppable = isDragDrop 
    || item.type === ASSET_TYPES.FOLDER
    || item.type === ASSET_TYPES.ALBUM;

  if (!isDroppable) {
    return <div>{ children }</div>
  }

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: getAcceptedTypes(item.type),
    // canDrop: (monitor) => console.log(monitor),
    drop: (draggable) => {
      if (draggable._id !== item._id) {
        onDrop(draggable, item);
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  })

  const assetCX = cx(isOver && 'border border-success');

  return (
    <div ref={drop} className={assetCX}>
      { children }
    </div>
  )
}

export default DroppableAsset;