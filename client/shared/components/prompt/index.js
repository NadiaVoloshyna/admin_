/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import cx from 'classnames';

import UAModal from 'shared/components/modal';

import styles from './index.module.scss';

const renderDefaultFooter = ({ onHide, onSubmit }) => (
  <>
    <Button variant="outline-dark" className={styles.button} onClick={onHide}>
      No
    </Button>
    <Button variant="success" className={styles.button} onClick={onSubmit}>
      Yes
    </Button>
  </>
);

renderDefaultFooter.propTypes = {
  onHide: PropTypes.func,
  onSubmit: PropTypes.func,
};

renderDefaultFooter.defaultProps = {
  onHide: () => null,
  onSubmit: () => null,
};

/*
 * Usage:
 *
 * ...
 *
 * import Prompt from 'shared/components/prompt';
 *
 * const Comp = () => {
 *   const [show, setState] = React.useState(true);
 *
 *   return (
 *     <Prompt
 *       show={show}
 *       headerProps={{
 *         closeButton: true,
 *         closeLabel: 'Bla'
 *       }}
 *       titleContent="Are you sure you want to delete “Actor” profession?"
 *       bodyContent="This item can’t be restore later."
 *       onHide={() => setState(false)}
 *       onSubmit={() => setState(false)}
 *     />
 *   )
 * }
 */
const UAPrompt = ({
  icon,
  headerProps: outerHeaderProps,
  titleProps: outerTitleProps,
  titleContent,
  bodyProps: outerBodyProps,
  footerProps: outerFooterProps,
  footerContent,
  ...props
}) => {
  const headerProps = {
    ...outerHeaderProps,
    className: cx(styles.header, outerHeaderProps.className),
  };
  const titleProps = {
    ...outerTitleProps,
    className: cx(styles.title, outerTitleProps.className),
  };
  const bodyProps = {
    ...outerBodyProps,
    className: cx(styles.body, outerBodyProps.className),
  };
  const footerProps = {
    ...outerFooterProps,
    className: cx(styles.footer, outerFooterProps.className),
  };

  return (
    <UAModal
      {...props}
      headerProps={headerProps}
      titleProps={titleProps}
      titleContent={
        titleContent && (
          <>
            {icon || <i className={cx(styles.icon, 'material-icons')}>info</i>}
            {titleContent}
          </>
        )
      }
      bodyProps={bodyProps}
      footerProps={footerProps}
      footerContent={footerContent || renderDefaultFooter}
    />
  );
};

UAPrompt.propTypes = {
  icon: PropTypes.node,
  headerProps: PropTypes.object,
  titleProps: PropTypes.object,
  titleContent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  bodyProps: PropTypes.object,
  footerProps: PropTypes.object,
  footerContent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};

UAPrompt.defaultProps = {
  icon: null,
  headerProps: {},
  titleProps: {},
  titleContent: null,
  bodyProps: {},
  footerProps: {},
  footerContent: null,
};

export default UAPrompt;
