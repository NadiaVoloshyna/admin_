import React, { useState } from 'react';
import { shape, arrayOf, number } from 'prop-types';
import { useRouter } from 'next/router';
import { useAlert } from 'react-alert';
import Layout from 'shared/components/layout';
import useListDataFetch from 'shared/hooks/useListDataFetch';
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

  const alert = useAlert();
  const router = useRouter();
  const handleError = useErrorHandler();
  const { refetchQuery } = useListDataFetch();

  const [ headerConfig, setHeaderConfig ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

  const canDeactivateUsers = user.deactivate('users');
  const canActivateUsers = user.activate('users');

  /** **********************
   * Event handlers
   *********************** */

  // Send invitation for a new user
  const onUserInvite = async (payload) => {
    setIsLoading(true);

    try {
      const { email, role } = payload;
      await UsersAPI.invite(email, role);
      alert.success(SUCCESS_MESSAGES.USERS_INVITE_USER);
    } catch (error) {
      handleError(error, ERROR_MESSAGES.USERS_INVITE_USER);
    } finally {
      setIsLoading(false);
    }
  };

  // Deactivates one or multiple users
  const onUserDeactivate = async (records) => {
    if (!canDeactivateUsers) return;
    setIsLoading(true);

    const ids = records.map(id => id._id);

    try {
      await UsersAPI.deactivateUser(ids);
      setHeaderConfig([]);
      refetchQuery();
    } catch (error) {
      handleError(error, ERROR_MESSAGES.USERS_DEACTIVATE_USERS);
    } finally {
      setIsLoading(false);
    }
  };

  // Aactivates one or multiple users
  const onUserActivate = async (records) => {
    if (!canActivateUsers) return;
    setIsLoading(true);

    const ids = records.map(id => id._id);

    try {
      await UsersAPI.activateUser(ids);
      setHeaderConfig([]);
      refetchQuery();
    } catch (error) {
      handleError(error, ERROR_MESSAGES.USERS_ACTIVATE_USERS);
    } finally {
      setIsLoading(false);
    }
  };

  // Set correct header config for selected users
  const onUsersSelect = (users) => {
    const allInactive = users.every(item => !item.active);
    if (allInactive) {
      return setHeaderConfig([{
        icon: 'check_circle',
        action: onUserActivate,
      }]);
    }

    const allActive = users.every(item => item.active);
    if (allActive) {
      return setHeaderConfig([{
        icon: 'blocked',
        action: onUserDeactivate,
      }]);
    }

    setHeaderConfig([]);
  };

  /** **********************
   * Helpers & Configs
   *********************** */

  // Redirect to user dashboard if permited
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
      <Layout activePage={PAGE_NAMES.USERS} user={user}>
        <Layout.Navbar>
          <h2>Users</h2>

          <div className="d-flex">
            <SearchField />
            <FilterByRoleDrawer />
          </div>

          <InviteUserDrawer
            onApply={onUserInvite}
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
            headerConfig={headerConfig}
            rowClasses={setRowClasses}
            rowEvents={rowEvents}
            onSelect={onUsersSelect}
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
  pages: number.isRequired,
};

export default UsersPage;
