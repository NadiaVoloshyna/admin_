import React from 'react';
import Card from 'react-bootstrap/Card';
import { applyTransformations, isOfType } from 'shared/helpers';

const Asset = (props) => {
  const { 
    item, 
    onSelect, 
    onDelete,
    canDelete
  } = props;

  const { name, type, url } = item;
  const { isFolder, isImage } = isOfType(type);

  const onClick = (event) => {
    event.stopPropagation();
    onSelect && onSelect(item);
  }

  const onCloseClick = (event) => {
    event.stopPropagation();
    onDelete && onDelete(item);
  }

  return (
    <>
      <Card 
        className={`asset asset-${type}`}
        onClick={onClick}
      >
        { canDelete &&
          <div className="close" onClick={onCloseClick}>
            <span aria-hidden="true">&times;</span>
          </div>
        }

        { (isImage) && 
          <Card.Img variant="top" src={applyTransformations(url, 'c_thumb,w_auto,c_scale')} /> 
        }

        { (isFolder) && <Card.Body>
            <Card.Text>{ name }</Card.Text>
          </Card.Body>
        }
      </Card>
      <style global jsx>{`
        .asset-wrapper {
          flex-basis: 33%;
          padding: 0 10px 20px;
        }

        .asset-wrapper:nth-child(3n) {
          padding-right: 0;
        }

        .asset-wrapper:nth-child(3n + 1) {
          padding-left: 0;
        }

        .asset {
          cursor: pointer;
          align-items: center;
        }

        .asset:not(.asset-folder) {
          height: 200px;
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
    </>
  )
}

export default Asset;