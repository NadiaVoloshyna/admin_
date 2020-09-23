import React from 'react';
import { string, shape, object, func } from 'prop-types';
import StatusButton from 'pages/Person/components/statusButton';
import DocumentButton from 'pages/Person/components/documentButton';

const DocumentActions = (props) => {
  const {
    documentId,
    updateStatus,
    permissions
  } = props;

  return (
    <>
      <div className="d-flex document-actions">
        <StatusButton
          updateStatus={updateStatus}
          permissions={permissions}
        />
        <DocumentButton
          documentId={documentId}
          permissions={permissions}
        />
      </div>
      <style jsx global>{`
        .document-actions > * {
          flex: 1;
          margin-left: 5px;
        }
      `}</style>
    </>
  );
};

DocumentActions.propTypes = {
  documentId: string.isRequired,
  updateStatus: func,
  permissions: shape(object).isRequired,
};

DocumentActions.defaultProps = {
  updateStatus: () => {}
};

export default DocumentActions;
