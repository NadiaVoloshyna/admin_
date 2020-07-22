import React from 'react';
import { shape, string } from 'prop-types';
import Button from 'react-bootstrap/Button';
import { UserType } from 'common/prop-types/authorization/user';
import permissions from '../../../../permissions';

const DocumentAction = ({ documentId, me }) => {
  const getDocumentMode = () => {
    if (permissions.can(me.role).readOwn('document').granted) return 'view';
    if (permissions.can(me.role).updateOwn('document').granted) return 'edit';
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
  me: shape(UserType).isRequired
};

export default DocumentAction;
