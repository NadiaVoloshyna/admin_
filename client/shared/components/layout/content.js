import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { string, bool, oneOfType, arrayOf, node } from 'prop-types';
import Loader from 'shared/components/loader';
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
          <Loader isLoading={loading} />
        </div>

        <style global jsx>{`
          .page-content {
            overflow-y: scroll;
          }

          .page-content-inner {
            position: relative;
            padding: 24px;
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
