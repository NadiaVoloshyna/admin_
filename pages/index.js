import React from 'react';
import Head from 'next/head';
import { number } from 'prop-types';
import HomePage from 'pages/Home';
import WithError from 'shared/components/withError';

const Home = (props) => (
  <WithError statusCode={props.statusCode}>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
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
