import React, { useContext } from 'react';
import cx from 'classnames';
import _startsWith from 'lodash/startsWith';
import { any, bool } from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';

const LayoutContent = (props) => {
  const { 
    children,
    className
  } = props;

  const isLoading = false; // TODO: get it from state
  const contentCX = cx('row flex-grow-1 page-content', className && className);
  
  return (
    <div className={contentCX}>
      <div className="col page-content-inner">
        { children }

        { isLoading && 
          <div className="content-loader shadow-lg text-primary">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        }
      </div>

      <style global jsx>{`
        .page-content {
          overflow-y: scroll;
        }

        .page-content-inner {
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

        .page-content-inner .spinner-border {
          width: 5rem;
          height: 5rem;
          animation-duration: 1.25s;
        }
      `}</style>
    </div>
  )
}

LayoutContent.propTypes = {
  className: any,
  children: any,
  isLoading: bool,
}

LayoutContent.defaultProps = {
  className: '',
  isLoading: false,
}

export default LayoutContent
