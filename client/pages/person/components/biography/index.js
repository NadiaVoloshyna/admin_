import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const EditorWindow = dynamic(
  () => import('../../../../shared/components/editor'),
  { ssr: false }
)

const PersonsBiography = ({ biography, client }) => {
  const [showEditorWindow, toggleEditorWindow] = useState(false);

  return (
    <div className="card mb-3">
      <div className="card-header">
        Biography
      </div>
      <div className="card-body text-center">
        <a 
          href="#" 
          onClick={() => toggleEditorWindow(true)}
        >
          <div>{ biography }</div>
          Add Content
        </a>
      </div>
      { showEditorWindow && <EditorWindow 
        showEditorWindow={showEditorWindow}
        toggleEditorWindow={toggleEditorWindow}
      />}
    </div>
  )
}

export default PersonsBiography;
