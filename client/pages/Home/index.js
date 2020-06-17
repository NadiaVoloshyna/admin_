import React from 'react';
import Head from 'next/head';
import Layout from 'shared/components/layout';

const HomePage = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Layout activePage="Home">
      <Layout.Navbar>
        Home
      </Layout.Navbar>

      <Layout.Content className="pt-0">
        <div className="h-100 d-flex justify-content-center align-items-center">
          <h1 className="display-2">UkraЇnian</h1>
        </div>
      </Layout.Content>
    </Layout>
  </div>
);

export default HomePage;
