import React from 'react';
import { shape, func, bool } from 'prop-types';
import Card from 'react-bootstrap/Card';
import { applyTransformations, isOfType, getAssetMetadata } from '../helpers';
import Draggable from './draggable';
import Droppable from './droppable';
import Actions from '../actionsMenu';
import { AssetType } from '../../../prop-types';

const Asset = (props) => {
  const {
    item,
    onSelect,
    onDelete,
    canDelete,
    onMove,
    isDragDrop
  } = props;

  const { name, type, url, year } = item;
  const { isImage, isAlbum } = isOfType(type);

  const onClick = (event) => {
    event.stopPropagation();
    onSelect && onSelect(item);
  };

  const onDeleteClick = (event) => {
    event.stopPropagation();
    onDelete && onDelete(item);
  };

  return (
    <Droppable item={item} onDrop={onMove} isDragDrop={isDragDrop}>
      <Draggable item={item} isDragDrop={isDragDrop}>
        <Card
          className={`asset asset-${type.toLowerCase()}`}
          onClick={onClick}
        >
          { (isImage || isAlbum)
            && (
            <Card.Img
              variant="top"
              src={applyTransformations(url, 'c_thumb,w_auto,c_scale')}
            />
            )}

          <Card.Body>
            <div className="d-flex align-items-center">
              <i
                className="material-icons mr-2 text-muted"
                icon={getAssetMetadata(type).icon}
              >
                folder
              </i>
              <Card.Text className="text-truncate"><small>{ name }</small></Card.Text>
            </div>

            { (isAlbum) && <Card.Text><small>{ year }</small></Card.Text> }
          </Card.Body>

          <Actions
            canDelete={canDelete}
            onDelete={onDeleteClick}
          />
        </Card>
      </Draggable>

      <style global jsx>{`
        .asset {
          cursor: pointer;
          position: relative;
        }

        .asset:hover .actions-menu {
          display: block;
        }

        .asset.asset-folder .card-body {
          display: flex;
          align-items: center;
        }

        .asset.asset-image .card-img-top {
          height: 250px;
          object-fit: cover;
        }

        .asset.asset-album p {
          margin: 0;
        }

        .asset:hover .close {
          display: flex;
        }

        .asset .close {
          display: none;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: -10px;
          right: -10px;
          width: 20px;
          height: 20px;
          border: 1px solid rgba(0, 0, 0, 0.125);
          border-radius: 50%;
          background: #fff;
          font-weight: normal;
          opacity: 1;
        }

        .asset .close span {
          margin-top: -4px;
          margin-right: -1px;
          opacity: .5;
        }
      `}</style>
    </Droppable>
  );
};

Asset.propTypes = {
  item: shape(AssetType).isRequired,
  onSelect: func,
  onDelete: func,
  canDelete: bool,
  onMove: func,
  isDragDrop: bool
};

Asset.defaultProps = {
  onSelect: () => {},
  onDelete: () => {},
  canDelete: false,
  onMove: () => {},
  isDragDrop: false
};

export default Asset;
