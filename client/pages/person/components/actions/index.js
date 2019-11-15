import React from 'react';

const PersonActions = ({ disableActions }) => (
  <div className="bg-light text-right mb-4">
    <div className="btn-group" role="group">
      <button 
        type="submit"
        className="btn btn-success"
        disabled={disableActions}
      >Save</button>
      <button 
        type="button" 
        className="btn btn-secondary"
        disabled={disableActions}
      >Discard</button>
    </div>
  </div>
)

export default PersonActions;