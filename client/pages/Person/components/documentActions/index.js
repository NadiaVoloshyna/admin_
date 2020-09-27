import React from 'react';
import { string, shape, object, func } from 'prop-types';
import StatusButton from 'pages/Person/components/statusButton';
import DocumentButton from 'pages/Person/components/documentButton';
import HistoryButton from 'pages/Person/components/historyButton';

const DocumentActions = (props) => {
  const {
    documentId,
    updateStatus,
    permissions,
    onHistoryGet,
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
        <HistoryButton onHistoryGet={onHistoryGet} />
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
  updateStatus: func.isRequired,
  permissions: shape(object).isRequired,
  onHistoryGet: func.isRequired,
};

export default DocumentActions;
