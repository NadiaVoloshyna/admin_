import { useState, useEffect } from 'react';
import Jodit, { font } from 'jodit';
import 'jodit/build/jodit.min.css';
quill/dist/quill.snow.css
const initEditor = () => {
  return new Jodit('#editor', {
    "spellcheck": false,
    "toolbarButtonSize": "large",
    "showCharsCounter": false,
    "showWordsCounter": false,
    "showXPathInStatusbar": false,
    extraButtons: [
      {
          name: 'heading',
          iconURL: 'https://user-images.githubusercontent.com/617986/57028994-69574f80-6bf5-11e9-97e5-f38c47fce010.png',
          exec: function (editor) {
            editor.execCommand('fontsize', false, 30);
          }
      }
    ]
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