import React, { useState } from 'react';
import { actions } from 'pages/Person/actions';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button'
import Dropzone from 'shared/components/dropzone';
import cx from 'classnames';
import { Field } from 'react-final-form';

const PersonPortrait = ({ portrait }) => {
  const [uploaded, setUploaded] = useState(false);
  const dispatch = useDispatch();

  const onDrop = (acceptedFiles => {
    setUploaded(true);
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
        <Field name="portrait">
          {props => {
            if (uploaded && portrait) {
              props.input.onChange(portrait);
              setUploaded(false);
            }

            return (
              <Dropzone
                text="Upload Portrait"
                component={uploadButton}
                onDrop={onDrop}
              />
            )
          }}
        </Field>
      </div>
      <style global jsx>{`
        .portrait {
          height: 276px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .with-image {
          background: transparent url('/api/images/${portrait}') no-repeat top/100%;
        }
      `}</style>
    </div>
  )
}

export default PersonPortrait;
