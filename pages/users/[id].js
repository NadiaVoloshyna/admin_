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
          <div>
            <div>Useres List</div>
          </div>
        </Layout.Content>
      </Layout>
    </div>
  )
};

UserProfile.getInitialProps = ({  }) => {
  
}

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(
  withError(
    
  )
);
