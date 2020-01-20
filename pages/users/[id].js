import React from 'react';
import Head from 'next/head';

function UserProfile () {
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
        </Layout.Content>
      </Layout>

      <div>
        <div>Useres List</div>
      </div>
    </div>
  )
};

Users.getInitialProps = ({ a }) => {
  const { store } = a ;

  // Set initial state
  store.dispatch(pageActions.usersInitialState(initialState));
  store.dispatch(pageActions.getUsers());
}

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(
  withError(
    withUser(UserProfile),
    'admin'
  )
);
