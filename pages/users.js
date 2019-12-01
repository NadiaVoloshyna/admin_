import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import Layout from 'shared/components/layout';
import InviteUserModal from 'pages/users/components/inviteUserModal';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import UsersList from 'pages/users/components/usersList';
import { actions as pageActions } from 'pages/users/actions';
import { auth } from 'utils/auth';
import { withError } from 'shared/components/withError';
import { initialState } from 'pages/users/reducers';

const Users = () => {
  const { users } = useSelector(state => state.users);
  const [showInviteUserModal, toggleShowInviteUserModal] = useState(false);
  
  return (
    <>
      <Layout activePage="Users" >
        <Layout.Navbar>
          <Button 
            variant="outline-primary"
            onClick={() => toggleShowInviteUserModal(true)}
          >Invite User</Button>
        </Layout.Navbar>

        <Layout.Content>
          { users && !users.length &&
            <Jumbotron className="text-center">
              <p>There are no users yet. To invite someone please press invite button.</p>
            </Jumbotron>
          } 

          { users && users.length && 
            <UsersList users={users} /> 
          }
        </Layout.Content>
      </Layout>

      <InviteUserModal 
        show={showInviteUserModal} 
        onClose={() => toggleShowInviteUserModal(false)}
      />
    </>
  )
}

Users.getInitialProps = ({ ctx }) => {
  const { store } = ctx;
  const user = auth(ctx);
  
  // Set initial state
  store.dispatch(pageActions.usersInitialState(initialState));
  store.dispatch(pageActions.getUsers());

  return {
    user
  };
}

const mapDispatchToProps = {
  
};

export default connect(
  null,
  mapDispatchToProps
)(withError(Users, 'admin'));
