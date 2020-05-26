import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head'; 
import Layout from 'shared/components/layout';
import InviteUserModal from 'pages/users/components/inviteUserModal';
import Button from 'react-bootstrap/Button';
import UsersList from 'pages/users/components/usersList';

const UsersPage = () => {
  const { users } = useSelector(state => state.users);
  const { isSuper } = useSelector(state => state.user);
  const [showInviteUserModal, toggleShowInviteUserModal] = useState(false);

  return(
    <>
      <Head>
        <title>Users</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout activePage="Users" >
        <Layout.Navbar className="mb-3">
          <Button 
            variant="primary"
            onClick={() => toggleShowInviteUserModal(true)}
          >Invite User</Button>
        </Layout.Navbar>

        <Layout.Content>
          <UsersList users={users} />
        </Layout.Content>
      </Layout>
   
      <InviteUserModal 
        show={showInviteUserModal} 
        onClose={() => toggleShowInviteUserModal(false)}
        canInviteAdmin={isSuper}
      />
    </>
  )
}

export default UsersPage; 