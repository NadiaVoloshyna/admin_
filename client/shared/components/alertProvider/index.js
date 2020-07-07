import React from 'react';
import { transitions, positions, Provider } from 'react-alert';
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
    width: '800px',
    transform: 'translateX(-50%)'
  }
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
    <AlertBootstrap variant={variant()}>
      { message }
    </AlertBootstrap>
  );
};

const AlertProvider = (props) => (
  <Provider template={AlertTemplate} {...config}>
    { props.children }
  </Provider>
);

export default AlertProvider;
