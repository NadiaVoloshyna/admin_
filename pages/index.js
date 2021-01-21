import React from 'react';
import { number } from 'prop-types';
import HomePage from 'pages/Home';
import WithError from 'shared/components/withError';
import Head from 'next/head';

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
