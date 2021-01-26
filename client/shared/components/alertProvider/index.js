import React from 'react';
import { exact, string, oneOf, number, shape, oneOfType, element, elementType } from 'prop-types';
import { transitions, positions, types, Provider } from 'react-alert';
import AlertBootstrap from 'react-bootstrap/Alert';

const config = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
  containerStyle: {
    alignItems: 'none',
    left: '50%',
    width: '87%',
    transform: 'translateX(-50%)',
  },
};

const AlertTemplate = ({ options, message }) => {
  const variant = () => {
    switch (options.type) {
      case 'error':
        return 'danger';
      default:
        return options.type;
    }
  };

  return (
    <AlertBootstrap className="d-flex justify-content-between" variant={variant()}>
      <div className="d-flex align-items-center">
        <i className="material-icons">check_circle_outline</i>
        <span className=" ml-3">{ message }</span>
      </div>
      <div className="d-flex align-items-center">
        <span className=" mr-3">
          Window will automatically disappear in 5 seconds
        </span>
        <i className="material-icons">clear</i>
      </div>
    </AlertBootstrap>
  );
};

AlertTemplate.propTypes = {
  options: exact({
    offset: string,
    position: oneOf(Object.values(positions)),
    timeout: number,
    type: oneOf(Object.values(types)),
    transition: oneOf(Object.values(transitions)),
    containerStyle: shape({
      alignItems: string,
      left: string,
      width: string,
      transform: string,
    }),
  }).isRequired,
  message: string,
};

AlertTemplate.defaultProps = {
  message: null,
};

const AlertProvider = (props) => (
  <Provider template={AlertTemplate} {...config}>
    { props.children }
  </Provider>
);

AlertProvider.propTypes = {
  children: oneOfType([element, elementType]).isRequired,
};

export default AlertProvider;
