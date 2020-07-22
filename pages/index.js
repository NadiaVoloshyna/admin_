import React from 'react';
import { number } from 'prop-types';
import HomePage from 'pages/Home';
import WithError from 'shared/components/withError';

const Home = (props) => (
  <WithError statusCode={props.statusCode}>
    <HomePage {...props} />
  </WithError>
);

Home.propTypes = {
  statusCode: number
};

Home.defaultProps = {
  statusCode: null
};

export default Home;
