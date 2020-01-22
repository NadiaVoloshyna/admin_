import React, { useContext } from 'react';
import cx from 'classnames';
import _startsWith from 'lodash/startsWith';
import { any, bool } from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import LayoutSidebar from './sidebar';
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
    className,
    children,
    maxHeight,
  } = props;

  const { isLoading } = useContext(LayoutContext);

  const padding = getClass(className, ['pt-', 'pb-', 'pr-', 'pl-', 'py-', 'px-']) || 'pt-5';
  const col = getClass(className, 'col-') || 'col-10';
  
  const pageContentClassName = cx('col');
  const rowClassName = cx('row justify-content-center', maxHeight && 'max-height', padding);
  const innerContentClassName = cx(
    'page-content',
    col,
    maxHeight && 'h-100'
  );

  return (
    <div className="row page">
      <LayoutSidebar /> 

      <div className={pageContentClassName}>
        <div className={rowClassName}>
          <div className={innerContentClassName}>
            { children }

            { isLoading && 
              <div className="content-loader shadow-lg text-primary">
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            }
          </div>
        </div>
      </div>

      <style global jsx>{`
        .page {
          padding-top: 54px;
        }

        .max-height {
          height: calc(100vh - 54px);
        }

        .page-content {
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

LayoutContent.propTypes = {
  className: any,
  children: any,
  isLoading: bool,
  maxHeight: bool
}

LayoutContent.defaultProps = {
  className: '',
  isLoading: false,
  maxHeight: false
}

export default LayoutContent
