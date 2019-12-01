import React from 'react';

const LayoutNavbar = (props) => {
  return (
    <>
      <div className="row mb-5">
        <div className="col">
          <nav className="navbar navbar-light shadow-sm">
            { props.children }
          </nav>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          height: 54px;
          max-height: 54px;
          background-color: #ffffff;
          margin-left: -15px;
          margin-right: -15px;
        }
      `}</style>
    </>
  )
}

export default LayoutNavbar
