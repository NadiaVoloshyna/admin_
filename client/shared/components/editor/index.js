import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import useEditor from './useEditor';

const EditorWindow = ({showEditorWindow, toggleEditorWindow}) => {
  const editor = useEditor();

  if (editor) {
    editor.events.on('afterCommand', (a, b) => {
      console.log(a)
      console.log(b)
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
            
          </div>
        </Modal.Header>
        <Modal.Body>
          <textarea id="editor" name="editor"></textarea>
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