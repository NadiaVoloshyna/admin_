import React, { useState } from 'react';
import { shape, arrayOf } from 'prop-types';
import Head from 'next/head';
import { useAlert } from 'react-alert';
import Layout from 'shared/components/layout';
import useErrorHandler from 'shared/hooks/useErrorHandler';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'shared/constants';
import InviteUserModal from 'pages/Users/components/inviteUserModal';
import Button from 'react-bootstrap/Button';
import UsersList from 'pages/Users/components/usersList';
import UsersAPI from 'pages/Users/api';
import { UserType } from 'common/prop-types/authorization/user';
import { PaginationType, UsersType } from 'shared/prop-types';

const UsersPage = (props) => {
  const { user } = props;

  const alert = useAlert();
  const handleError = useErrorHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [showInviteUserModal, toggleShowInviteUserModal] = useState(false);

  const [users, setUsers] = useState(props.users);
  const [pagination, setPagination] = useState(props.pagination);

  const onUsersGet = async (payload) => {
    setIsLoading(true);

    const newPagination = { ...pagination, ...payload };
    const { offset, searchTerm, sort } = newPagination;

    try {
      const { data: { users, pagination } } = await UsersAPI.getUsers(offset, searchTerm, sort);

      setUsers(users);
      setPagination(offset, searchTerm, sort, ...pagination);
    } catch (error) {
      handleError(error, ERROR_MESSAGES.USERS_GET_USERS);
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
        alert.success(SUCCESS_MESSAGES.USERS_INVITE_USER);
      } else {
        throw Error(response.message);
      }
    } catch (error) {
      handleError(error, ERROR_MESSAGES.USERS_INVITE_USER);
    } finally {
      setIsLoading(false);
    }
  };

  const onEdit = async (payload) => {
    setIsLoading(true);

    try {
      const response = await UsersAPI.update(payload);
      if (response.status === 200) {
        alert.success(SUCCESS_MESSAGES.USERS_EDIT_USER);
      } else {
        throw Error(response.message);
      }
    } catch (error) {
      handleError(error, ERROR_MESSAGES.USERS_EDIT_USER);
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

UsersPage.propTypes = {
  user: shape(UserType).isRequired,
  users: arrayOf(shape(UsersType)).isRequired,
  pagination: shape(PaginationType).isRequired
};

export default UsersPage;
