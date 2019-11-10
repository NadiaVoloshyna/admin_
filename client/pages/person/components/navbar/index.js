import React from 'react';

const PostNavbar = ({ disableActions }) => (
  <nav className="navbar navbar-light bg-light mb-5 justify-content-end">
    <div className="btn-group" role="group">
      <button 
        type="button" 
        className="btn btn-success"
        disabled={disableActions}
      >Save</button>
      <button 
        type="button" 
        className="btn btn-secondary"
        disabled={disableActions}
      >Discard</button>
    </div>
  </nav>
)

export default PostNavbar;