/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import cx from 'classnames';

import styles from './index.module.scss';

const DefaultDialog = ({ className, ...props }) => (
  <Modal.Dialog centered {...props} className={cx(styles.content, className)} />
);

DefaultDialog.propTypes = {
  className: PropTypes.string,
};

DefaultDialog.defaultProps = {
  className: '',
};

const isFunction = (maybeFunction) => typeof maybeFunction === 'function';

/*
 *  TLDR:
 *  This is wrapper above React Bootstrap Modal.
 *  The idea is to override whatever styles or
 *  behavior we need in this file and make it
 *  reusable within the project without having
 *  tight coupling with bootstrap components
 *  (avoid using Bootstrap Modal within the project).
 *  Also it should be the root for any new custom modal we need.
 *  It still uses Bootstrap's Modal API but only props.
 *  For the usage please check UAPrompt component.
 */
const UAModal = ({
  children,
  headerProps,
  titleProps,
  titleContent,
  bodyProps,
  bodyContent,
  footerProps,
  footerContent,
  ...props
}) => (
  <Modal {...props}>
    {children || (
      <>
        {titleContent && (
          <Modal.Header {...headerProps}>
            <Modal.Title {...titleProps}>
              {isFunction(titleContent) ? titleContent(props) : titleContent}
            </Modal.Title>
          </Modal.Header>
        )}
        {bodyContent && (
          <Modal.Body {...bodyProps}>
            {isFunction(bodyContent) ? bodyContent(props) : bodyContent}
          </Modal.Body>
        )}
        {footerContent && (
          <Modal.Footer {...footerProps}>
            {isFunction(footerContent) ? footerContent(props) : footerContent}
          </Modal.Footer>
        )}
      </>
    )}
  </Modal>
);

// I only described props which are used to override behaviour or actually introduced as new ones.
// In overall this component supports all the props provided by Modal component from bootstrap lib.
// For full list of props please check ModalProps type in react-bootstrap/Modal or in their docs.
// Be careful to choose right version of Bootstrap's docs.
UAModal.propTypes = {
  children: PropTypes.node,
  headerProps: PropTypes.object,
  titleProps: PropTypes.object,
  titleContent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  bodyProps: PropTypes.object,
  bodyContent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  footerProps: PropTypes.object,
  footerContent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  dialogAs: PropTypes.elementType,
};

UAModal.defaultProps = {
  children: null,
  headerProps: {},
  titleProps: {},
  titleContent: null,
  bodyProps: {},
  bodyContent: null,
  footerProps: {},
  footerContent: null,
  dialogAs: DefaultDialog,
};

export default UAModal;
