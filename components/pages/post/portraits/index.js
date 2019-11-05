import React from 'react';
import FileUpload from 'components/shared/file-upload';

const PersonsPortraits = ({ portraits }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        Portraits
      </div>
      <div className="row no-gutters">
        <div className="col-md-12 d-flex flex-row">
          <div className="file-upload-container border rounded ml-2 mt-2 mb-2">
            <FileUpload src={portraits.primary} />
          </div>
        </div>
      </div>
      <style jsx>{`
        .file-upload-container {
          height: 260px;
          width: 200px;
          min-width: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  )
}

export default PersonsPortraits;
