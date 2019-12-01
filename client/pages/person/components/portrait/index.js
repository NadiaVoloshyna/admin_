import React from 'react';
import { actions } from 'pages/person/actions';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button'
import Dropzone from 'shared/components/dropzone';
import cx from 'classnames';

const PersonPortrait = ({ portrait }) => {
  const dispatch = useDispatch();

  const onDrop = (acceptedFiles => {
    dispatch(actions.uploadPortrait(acceptedFiles));
  });

  const uploadButton = () => {
    return (
      <Button 
        variant="outline-secondary"
      >Upload Image</Button>
    )
  }

  const portraitClassNames = cx(
    'portrait card-body',
    portrait && 'with-image'
  );

  return (
    <div className="card mb-3">
      <div className="card-header">
        Portraits
      </div>
      <div className={portraitClassNames}> 
        <Dropzone
          text="Upload Portrait"
          component={uploadButton}
          onDrop={onDrop}
        />
      </div>
      <style global jsx>{`
        .portrait {
          height: 276px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .with-image {
          background: transparent url('/images/${portrait}') no-repeat top/100%;
        }
      `}</style>
    </div>
  )
}

export default PersonPortrait;
