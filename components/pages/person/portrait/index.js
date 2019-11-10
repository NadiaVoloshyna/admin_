import React from 'react';
import { actionCreator, actionTypes } from 'actions/person';
import { useDispatch } from 'react-redux';
import Dropzone from 'components/shared/dropzone';

const PersonsPortrait = ({ portrait }) => {
  const dispatch = useDispatch();

  const onDrop = (acceptedFiles => {
    dispatch(actionCreator(actionTypes.UPLOAD_PORTRAIT, acceptedFiles));
  });

  return (
    <div className="card mb-3">
      <div className="card-header">
        Portraits
      </div>
      <div className="row no-gutters">
        <div className="col-lg-6 col-xl-3">
          <Dropzone 
            src={portrait}
            className="portrait portrait-primary border rounded ml-2 mt-2 mb-2" 
            text="Upload Portrait"
            onDrop={onDrop}
          />
        </div>
      </div>
      <style global jsx>{`
        .portrait {
          height: 260px;
          width: 200px;
          max-width: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  )
}

export default PersonsPortrait;
