import React from 'react';

const PersonActions = ({ disableActions }) => (
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
)

export default PersonActions;