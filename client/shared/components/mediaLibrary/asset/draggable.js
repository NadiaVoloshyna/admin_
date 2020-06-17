import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableAsset = (props) => {
  const {
    item,
    children,
    isDragDrop = false
  } = props;

  const [drag] = useDrag({
    item,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    // canDrag: () => {
    //   return ASSET_TYPES.IMAGE === item.type
    // }
  });

  if (!isDragDrop) {
    return <div>{ children }</div>;
  }

  return (
    <div ref={drag}>
      { children }
    </div>
  );
};

export default DraggableAsset;
