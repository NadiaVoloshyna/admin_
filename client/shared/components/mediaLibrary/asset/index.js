import React from 'react';
import Card from 'react-bootstrap/Card';
import cx from 'classnames';
import { applyTransformations, isOfType } from 'shared/helpers';
import Draggable from './draggable';
import Droppable from './droppable';
import Actions from '../actionsMenu';

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
  const { isFolder, isImage, isAlbum } = isOfType(type);

  const onClick = (event) => {
    event.stopPropagation();
    onSelect && onSelect(item);
  }

  const onDeleteClick = (event) => {
    event.stopPropagation();
    onDelete && onDelete(item);
  }

  return (
    <Droppable item={item} onDrop={onMove} isDragDrop={isDragDrop}>
      <Draggable item={item} isDragDrop={isDragDrop}>
        <Card 
          className={`asset asset-${type.toLowerCase()}`}
          onClick={onClick}
        >

          { (isImage || isAlbum) && 
            <Card.Img variant="top" src={applyTransformations(url, 'c_thumb,w_auto,c_scale')} /> 
          }

          { (isFolder) && 
            <Card.Body>
              <Card.Text>{ name }</Card.Text>
            </Card.Body>
          }

          { (isAlbum) &&
            <Card.Body>
              <Card.Text>{ name }</Card.Text>
              <Card.Text><small>{ year }</small></Card.Text>
            </Card.Body>
          }

          <Actions
            canDelete={canDelete}
            onDelete={onDeleteClick}
          />
        </Card>
      </Draggable>

      <style global jsx>{`
        .asset-wrapper {
          padding: 0 10px 20px;
        }

        .asset {
          cursor: pointer;
          position: relative;
        }

        .asset:hover .actions-menu {
          display: block;
        }

        .asset.asset-folder .card-body {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .asset.asset-image .card-img-top {
          max-width: 100%;
          width: auto;
          max-height: 100%;
          height: auto;
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
  )
}

export default Asset;