import { useState, useEffect } from 'react';
import Quill from 'quill';

import 'quill/dist/quill.snow.css';

var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['image', 'video'],

  ['clean']                                         // remove formatting button
];

const initEditor = () => {
  return new Quill('#editor-container', {
    theme: 'snow',
    modules: {
      // toolbar: {
      //   container: '#editor-toolbar',
      //   options: toolbarOptions
      // }
      toolbar: toolbarOptions
    }
  });
}

const useEditor = () => {
  const [ editor, setEditor ] = useState(null);

  useEffect(() => {
    const asyncEffect = async () => {
      try {
        const instance = initEditor();
        setEditor(instance);
      } catch (reason) {
        console.log(`Editor.js initialization failed because of ${reason}`)
      }; 
    }

    asyncEffect();
  }, []);

  return editor;
};

export default useEditor;