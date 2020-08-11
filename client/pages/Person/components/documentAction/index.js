import React from 'react';
import { shape, string } from 'prop-types';
import Button from 'react-bootstrap/Button';
import { UserType } from 'common/prop-types/authorization/user';

const DocumentAction = ({ documentId, user }) => {
  const getDocumentMode = () => {
    if (user.readOwn('document').granted) return 'view';
    if (user.updateOwn('document').granted) return 'edit';
  };

  const mode = getDocumentMode();

  return (
    <>
      <Button
        className="document-action"
        target="_blank"
        href={`https://docs.google.com/document/d/${documentId}/${mode}`}
      >
        { mode }
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
  );
};

DocumentAction.propTypes = {
  documentId: string.isRequired,
  user: shape(UserType).isRequired
};

export default DocumentAction;
