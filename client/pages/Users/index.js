import React, { useState } from 'react';
import Head from 'next/head';
import { shape, arrayOf, number } from 'prop-types';
import { useRouter } from 'next/router';
import { useAlert } from 'react-alert';
import Layout from 'shared/components/layout';
import useErrorHandler from 'shared/hooks/useErrorHandler';
import { ERROR_MESSAGES, SUCCESS_MESSAGES, PAGE_NAMES } from 'shared/constants';
import FilterByRoleDrawer from 'pages/Users/components/filterByRoleDrawer';
import InviteUserDrawer from 'pages/Users/components/inviteUserDrawer';
import UsersAPI from 'pages/Users/api';
import { UserType } from 'common/prop-types/authorization/user';
import { UsersType } from 'shared/prop-types';
import Pagination from 'shared/components/pagination';
import Pager from 'shared/components/pager';
import SelectedFilters from 'shared/components/selectedFilters';
import SearchField from 'shared/components/searchField';
import DataGrid from 'shared/components/dataGrid';
import Filters from 'shared/components/filters';
import columns from './columns';

const UsersPage = (props) => {
  const { user, users, pages } = props;

  const [ isLoading, setIsLoading ] = useState(false);
  const alert = useAlert();
  const router = useRouter();
  const handleError = useErrorHandler();

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

  // const onEdit = async (payload) => {
  //   setIsLoading(true);

  //   UsersAPI.update(payload)
  //     .then(() => {
  //       alert.success(SUCCESS_MESSAGES.USERS_EDIT_USER);
  //     })
  //     .catch(error => handleError(error, ERROR_MESSAGES.USERS_EDIT_USER))
  //     .finally(() => setIsLoading(false));
  // };

  const rowEvents = {
    onClick: (e, row) => {
      if (!user.read('user')) return;

      router.push({
        pathname: '/users/[id]',
        query: { id: row._id },
      });
    },
  };

  const setRowClasses = (row) => {
    return row.active ? '' : 'inactive';
  };

  return (
    <>
      <Head>
        <title>Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout activePage={PAGE_NAMES.USERS} user={user}>
        <Layout.Navbar>
          <h2>Users</h2>

          <div className="d-flex">
            <SearchField />
            <FilterByRoleDrawer />
          </div>

          <InviteUserDrawer
            onApply={inviteUser}
            canInviteAdmin={user.invite('users')}
          />
        </Layout.Navbar>

        <Layout.Content isLoading={isLoading}>
          <div className="mb-4 d-flex justify-content-between">
            <Filters
              items={{
                all: 'All',
                active: 'Active',
                blocked: 'Blocked',
              }}
              name="status"
            />
            <SelectedFilters />
          </div>

          <DataGrid
            data={users}
            columns={columns}
            rowClasses={setRowClasses}
            rowEvents={rowEvents}
          />
        </Layout.Content>

        <Layout.Footer>
          <Pager />

          <Pagination pages={pages} />
        </Layout.Footer>
      </Layout>
    </>
  );
};

UsersPage.propTypes = {
  user: shape(UserType).isRequired,
  users: arrayOf(shape(UsersType)).isRequired,
  pages: number.isRequired
};

export default UsersPage;
