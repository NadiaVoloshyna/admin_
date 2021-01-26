import React from 'react';
import { shape, element, bool } from 'prop-types';
import { useDrag } from 'react-dnd';
import { AssetType } from '../../../prop-types';

const DraggableAsset = (props) => {
  const {
    item,
    children,
    isDragDrop,
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

DraggableAsset.propTypes = {
  item: shape(AssetType).isRequired,
  children: element.isRequired,
  isDragDrop: bool,
};

DraggableAsset.defaultProps = {
  isDragDrop: false,
};

export default DraggableAsset;
