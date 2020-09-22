import React from 'react';
import { shape, string, object } from 'prop-types';
import Button from 'react-bootstrap/Button';

const DocumentButton = ({ documentId, permissions }) => {
  if (permissions.isNew || (
    !permissions.canEditDocument()
      && !permissions.canReviewDocument()
      && !permissions.canViewDocument())
  ) return null;

  const getDocumentMode = () => {
    if (permissions.canEditDocument()) return 'Edit';
    if (permissions.canReviewDocument()) return 'Review';
    if (permissions.canViewDocument()) return 'View';
  };

  const mode = getDocumentMode();

  return (
    <>
      <Button
        className="w-100 mb-4"
        target="_blank"
        href={`https://docs.google.com/document/d/${documentId}/${mode.toLowerCase()}`}
      >
        { mode }
      </Button>
    </>
  );
};

DocumentButton.propTypes = {
  documentId: string.isRequired,
  permissions: shape(object).isRequired,
};

export default DocumentButton;
