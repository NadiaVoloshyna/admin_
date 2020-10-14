import React from 'react';
import Head from 'next/head';
import { shape } from 'prop-types';
import Layout from 'shared/components/layout';
import { UserType } from 'common/prop-types/authorization/user';
import { PAGE_NAMES } from 'shared/constants';

const HomePage = ({ user }) => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Layout activePage={PAGE_NAMES.DASHBOARD} user={user}>
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

HomePage.propTypes = {
  user: shape(UserType).isRequired,
};

export default HomePage;
