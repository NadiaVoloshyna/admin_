import React from 'react';
import cx from 'classnames';
import _startsWith from 'lodash/startsWith';
import { any, bool } from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import LayoutSidebar from './sidebar';
import { LayoutContext } from './index';

const getClass = (classNames, name) => {
  const arrayOfClasses = classNames.split(' ');

  return arrayOfClasses.find(key => _startsWith(key, name));
}

const LayoutContent = (props) => {
  const { 
    className,
    children,
    isLoading,
    maxHeight,
  } = props;

  const padding = getClass(className, 'pt-') || 'pt-5';
  const col = getClass(className, 'col-') || 'col-10';
  
  const pageContentClassName = cx('col-10', maxHeight && 'h-100');
  const rowClassName = cx('row justify-content-center', maxHeight && 'h-100');
  const innerContentClassName = cx(
    'page-content',
    col,
    padding,
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
