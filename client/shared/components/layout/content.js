import React, { useContext } from 'react';
import cx from 'classnames';
import _startsWith from 'lodash/startsWith';
import { any, bool } from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import { LayoutContext } from './index';

const getClass = (classNames, names) => {
  const arrayOfClasses = classNames.split(' ');

  names = Array.isArray(names) ? names : [names];

  return arrayOfClasses.find(key => {
    return names.some(name => _startsWith(key, name));
  });
}

const LayoutContent = (props) => {
  const { 
    children,
  } = props;

  const { isLoading } = useContext(LayoutContext);
  
  return (
    <div className="row flex-grow-1 page-content">
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
