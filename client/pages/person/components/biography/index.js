import React from 'react';
import Button from 'react-bootstrap/Button';

function openInNewTab(documentId) {
  const url = `https://docs.google.com/document/d/${documentId}/edit`;
  const win = window.open(url, '_blank');
  win.focus();
}

const PersonBiography = ({ biography, name }) => {
  return (
    <div className="card mb-3 person-biography">
      <div className="card-header">
        Biography
        { !!biography.documentId &&
          <Button 
            className="float-right"
            variant="outline-secondary"
            size="sm"
            onClick={() => openInNewTab(biography.documentId)}>
            Edit
          </Button>
        }
      </div>
      <div className="card-body">
        { !!biography.documentBody && 
          <div dangerouslySetInnerHTML={{__html: biography.documentBody}} /> 
        }
        { !biography.documentBody && !!biography.documentId && 
          <div className="text-center">
            <p>Now you can start writing {name}'s biography. 
            You will be redirected to google document page.
            Please note that content of that document would not be reflected in this post right away.
            </p>
            <Button 
              variant="outline-secondary"
              onClick={() => openInNewTab(biography.documentId)}
            >Edit Content</Button>
          </div>
        }

        { !biography.documentBody && !biography.documentId &&
          <div>
            <p className="text-center">Before you can start writing biography you need to name this page and save it.</p>
          </div>
        }
      </div>

      <style jsx>{`
        .person-biography .card-body {
          height: 276px;
        }
      `}</style>
    </div>
  )
}

export default PersonBiography;
