import React from 'react';
import { useDrag } from 'react-dnd';
import { ASSET_TYPES } from 'shared/constants';

const DraggableAsset = (props) => {
  const { 
    item, 
    children,
    isDragDrop = false
  } = props;

  if (!isDragDrop) {
    return <div>{ children }</div>
  }

  const [{ isDragging }, drag] = useDrag({
    item,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    // canDrag: () => {
    //   return ASSET_TYPES.IMAGE === item.type
    // }
  });

  return (
    <div ref={drag}>
      { children }
    </div>
  )
}

export default DraggableAsset;