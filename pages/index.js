import React from 'react'
import Head from 'next/head';
import Layout from 'shared/components/layout';
import { connect } from 'react-redux';
import { auth } from 'utils/auth';

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <Layout activePage="Home">
      <Layout.Navbar>
        Home
      </Layout.Navbar>

      <Layout.Content>
        
      </Layout.Content>
    </Layout>
  </div>
)

Home.getInitialProps = ({ ctx }) => {
  auth(ctx);
}

export default connect()(Home);
