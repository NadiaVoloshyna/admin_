import React from 'react';
import Head from 'next/head';
import Layout from 'shared/components/layout';
import { connect } from 'react-redux';
import { withUser } from 'shared/components/withUser';


function UserProfile ({ id }) {
  return (
    <div className="users-page">
      <Head>
        <title>Users</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout activePage="UserProfile" >
        <Layout.Navbar>
        </Layout.Navbar>

        <Layout.Content>
          <div>
            <div>{ id }</div>
          </div>
        </Layout.Content>
      </Layout>
    </div>
  )
};

UserProfile.getInitialProps = (ctx) => {
  const { query } = ctx;
  return { 
    id: query.id
  }
}

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(UserProfile);