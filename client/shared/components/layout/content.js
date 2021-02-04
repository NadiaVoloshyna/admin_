import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { string, bool, oneOfType, arrayOf, node } from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import { PageContext } from 'shared/context';

const LayoutContent = (props) => {
  const {
    children,
    className,
    isLoading,
  } = props;

  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  const contentCX = cx('row flex-grow-1 page-content', className);

  return (
    <PageContext.Provider value={{ setIsLoading }}>
      <div className={contentCX}>
        <div className="col page-content-inner">
          { children }

          { loading
            && (
            <div className="content-loader shadow-lg text-primary">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
            )}
        </div>

        <style global jsx>{`
          .page-content {
            overflow-y: scroll;
          }

          .page-content-inner {
            position: relative;
            padding: 24px;
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
    </PageContext.Provider>
  );
};

LayoutContent.propTypes = {
  className: string,
  isLoading: bool,
  children: oneOfType([
    arrayOf(node),
    node,
  ]).isRequired,
};

LayoutContent.defaultProps = {
  className: '',
  isLoading: false,
};

export default LayoutContent;
