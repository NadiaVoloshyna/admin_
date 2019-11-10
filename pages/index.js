import React from 'react'
import Head from 'next/head';
import Layout from 'shared/components/layout';
import { connect } from 'react-redux';

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <Layout activePage="Home">
    Home
    </Layout>
  </div>
)

export default connect()(Home);
