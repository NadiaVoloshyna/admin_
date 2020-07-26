import React from 'react';
import { string } from 'prop-types';
import Head from 'next/head';
import Layout from 'shared/components/layout';

function UserProfile({ id }) {
  return (
    <div className="users-page">
      <Head>
        <title>Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout activePage="UserProfile">
        <Layout.Navbar />

        <Layout.Content>
          <div>
            <div>{ id }</div>
          </div>
        </Layout.Content>
      </Layout>
    </div>
  );
}

UserProfile.getInitialProps = (ctx) => {
  const { query } = ctx;
  return {
    id: query.id
  };
};

UserProfile.propTypes = {
  id: string.isRequired
};

export default UserProfile;
