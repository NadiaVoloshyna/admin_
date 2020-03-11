import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import Layout from 'shared/components/layout';
import InviteUserModal from 'pages/users/components/inviteUserModal';
import Button from 'react-bootstrap/Button';
import UsersList from 'pages/users/components/usersList';
import { actions as pageActions } from 'pages/users/actions';
import { withUser } from 'shared/components/withUser';
import { initialState } from 'pages/users/reducers';

const Users = () => {
  const { users } = useSelector(state => state.users);
  const { isSuper } = useSelector(state => state.user);
  const [showInviteUserModal, toggleShowInviteUserModal] = useState(false);
  
  return (
    <>
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

Users.getInitialProps = ({ ctx }) => {
  const { store } = ctx;

  // Set initial state
  store.dispatch(pageActions.usersInitialState(initialState));
  store.dispatch(pageActions.getUsers());
}

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(
  withUser(Users),
);
