import React from 'react';
import Button from 'react-bootstrap/Button';
import _lowerCase from 'lodash/lowerCase';
import _startCase from 'lodash/startCase';

const DocumentAction = ({ documentId, me, permissions }) => {
  return (
    <>
      <Button 
        className="document-action"
        target="_blank"
        href={`https://docs.google.com/document/d/${documentId}/${me.permissions}`}
      >
        { me.permissions }
      </Button>
      <style>{`
        .document-action {
          width: 50%;
          flex-basis: 50%;
          flex-grow: 1;
          margin-left: 10px;
        }
      `}</style>
    </>
  )
}

export default DocumentAction;