import React from 'react';
import HomePage from 'pages/Home';
import WithError from 'shared/components/withError';

const Home = (props) => (
  <WithError statusCode={props.statusCode}>
    <HomePage {...props} />
  </WithError>
);
export default Home;
