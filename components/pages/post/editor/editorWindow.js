import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import useEditor from './useEditor';
import { writeData } from 'utils/apollo';

const saveChanges = (editor, toggleEditorWindow, writeData) => {
  //const content = editor.getContents();
  const htmlContent = editor.root.innerHTML;

  writeData({
    person: {
      biography: htmlContent
    }
  });

  toggleEditorWindow(false);
}

const EditorWindow = ({client, showEditorWindow, toggleEditorWindow}) => {
  const editor = useEditor();
  const [content, setContent] = useState([]);

  if (editor) {
    editor.on('text-change', function(delta, oldDelta, source) {
    });
  }

  return (
    <>
      <Modal
        show={showEditorWindow}
        onHide={() => toggleEditorWindow(false)}
        dialogClassName="modal-full-size"
        aria-labelledby="example-custom-modal-styling-title"
        backdrop={false}
      >
        <Modal.Header>
          <div id="editor-toolbar">
            {/* <button className="ql-bold"></button>
            <button className="ql-script" value="sub"></button>
            <button className="ql-script" value="super"></button>

            <button className="ql-header" value="1"></button>
            <button className="ql-header" value="2"></button> */}
          </div>
        </Modal.Header>
        <Modal.Body>
          <div id="editor-container"></div>
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup aria-label="Editor action buttons">
            <Button 
              variant="success"
              onClick={() => saveChanges(editor, toggleEditorWindow, writeData)}
            >Save</Button>
            <Button 
              variant="secondary"
              onClick={() => toggleEditorWindow(false)}
            >Discart</Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
      <style global jsx>{`
        .modal-full-size {
          max-width: 100%;
          margin: 0;
        }

        .modal-full-size .modal-content {
          width: 100% !important;
          height: 100vh !important;
        }

        #editor-toolbar {
          border: none;
        }

        #editor-container {
          border-left: none;
          border-right: none;
        }
      `}</style>
    </>
  )
};

export default EditorWindow;