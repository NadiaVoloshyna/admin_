import React from 'react';
import { shape } from 'prop-types';
import { UserType } from 'common/prop-types/authorization/user';
import Head from 'next/head';
import { PAGE_NAMES } from 'shared/constants';
import Layout from 'shared/components/layout';
import UserInfo from './components/userInfo';

// _app.js will replace user prop with currently logged in user
// so we use currentUser to pass user from HOC. Confusing, right :)
const UserPage = ({ user, currentUser }) => {
  const {
    fullName,
  } = currentUser;

  const onEdit = (image) => {
    console.log(image);
  };

  return (
    <div>
      <Head>
        <title>Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout activePage={PAGE_NAMES.PROFILE} user={user}>
        <Layout.Navbar className="mb-3">
          <h3>{ fullName }</h3>
        </Layout.Navbar>

        <Layout.Content>
          <UserInfo
            user={currentUser}
            onEdit={onEdit}
          />
        </Layout.Content>
      </Layout>
    </div>
  );
};

UserPage.propTypes = {
  user: shape(UserType).isRequired,
  currentUser: shape(UserType).isRequired,
};

export default UserPage;
