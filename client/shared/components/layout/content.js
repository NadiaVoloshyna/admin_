import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LayoutContent = (props) => {
  return (
    <div className="col-10 bg-light page-content">
      <div className="row justify-content-center">
        <div className="col-10 page-content__inner-wrapper">
          { props.children }

          { props.isLoading && 
            <div className="content-loader shadow-lg text-primary">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          }
        </div>
      </div>

      <style global jsx>{`
        .page-content__inner-wrapper {
          position: relative;
        }

        .content-loader {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(248, 249, 250, .6);
        }

        .page-content .spinner-border {
          width: 5rem;
          height: 5rem;
          animation-duration: 1.25s;
        }
      `}</style>
    </div>
  )
}

export default LayoutContent
