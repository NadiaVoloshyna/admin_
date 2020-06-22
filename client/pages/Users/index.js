import React, { useState } from 'react';
import Head from 'next/head';
import Layout from 'shared/components/layout';
import InviteUserModal from 'pages/Users/components/inviteUserModal';
import Button from 'react-bootstrap/Button';
import UsersList from 'pages/Users/components/usersList';
import UsersAPI from 'pages/Users/api';

const UsersPage = (props) => {
  const { user } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [showInviteUserModal, toggleShowInviteUserModal] = useState(false);

  const [users, setUsers] = useState(props.users);
  const [pagination, setPagination] = useState(props.pagination);

  const onUsersGet = async (payload) => {
    setIsLoading(true);

    const newPagination = { ...pagination, ...payload };
    const { offset, searchTerm, sort } = newPagination;

    try {
      const response = await UsersAPI.getUsers(offset, searchTerm, sort);
      const usersResponse = await response.json();
      const { users, pagination } = usersResponse;

      if (response.status === 200) {
        setUsers(users);
        setPagination(offset, searchTerm, sort, ...pagination);
      }

      if (response.status === 500) {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const inviteUser = async (payload) => {
    setIsLoading(true);

    try {
      const { email, role } = payload;
      const response = await UsersAPI.invite(email, role);

      if (response.status === 200) {
        console.log('User invitation successful');
      } else {
        throw Error(response.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onEdit = async (payload) => {
    setIsLoading(true);

    try {
      const response = await UsersAPI.update(payload);
      if (response.status === 200) {
        console.log(response);
      } else {
        throw Error(response.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout activePage="Users">
        <Layout.Navbar className="mb-3">
          <Button
            variant="primary"
            onClick={() => toggleShowInviteUserModal(true)}
          >Invite User</Button>
        </Layout.Navbar>

        <Layout.Content isLoading={isLoading}>
          <UsersList
            users={users}
            onUsersGet={onUsersGet}
            onEdit={onEdit}
            pagination={pagination}
            isSuper={user.isSuper}
          />
        </Layout.Content>
      </Layout>

      <InviteUserModal
        show={showInviteUserModal}
        onClose={() => toggleShowInviteUserModal(false)}
        canInviteAdmin={user.isSuper}
        inviteUser={inviteUser}
      />
    </>
  );
};

export default UsersPage;
