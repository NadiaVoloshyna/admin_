import React, { useState } from 'react';
import Head from 'next/head'; 
import Layout from 'shared/components/layout';
import InviteUserModal from 'pages/users/components/inviteUserModal';
import Button from 'react-bootstrap/Button';
import UsersList from 'pages/users/components/usersList';
import UserAPI from 'pages/Users/api'; 

const UsersPage = (props) => {
  const [isLoading, setIsLoading] = useState(false); 
  const [isSuper, setIsSuper] = useState(false); 
  const [showInviteUserModal, toggleShowInviteUserModal] = useState(false);

  const [users, setUsers] = useState(props.users); 
  const [pagination, setPagination] = useState(props.pagination); 

  const onUsersGet = async (payload) => {
    setIsLoading(true);
    
    const newPagination = { ...pagination, ...payload };
    const { offset, searchTerm, sort } = newPagination; 
  
    try {
      const response = await UserAPI.getUsers(offset, searchTerm, sort);
      const usersResponse = await response.json();
      const { users, pagination } = usersResponse; 

      if (response.status === 200) {
        setUsers( users);
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
  }

  const inviteUser = async (payload) => {
    setIsLoading(true);
     
    try {
      const { email, role } = payload;
      const response = await UserAPI.invite(email, role);
      const data = await response.json();
      if(response.status === 200){
        console.log('User invitation successful'); 
      } else {
        throw Error(response.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); 
    }
  }


  const onEdit = async (payload) => {
    setIsLoading(true); 

    try {
      const response = await UserAPI.update(payload); 
      if(response.status === 200){
        console.log(response); 
      }else {
        throw Error(response.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); 
    }
  }

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
          <UsersList 
            users={users} 
            onUsersGet={onUsersGet}
            onEdit={onEdit}
            pagination={pagination}
            isSuper={isSuper}/>
        </Layout.Content>
      </Layout>
   
      <InviteUserModal 
        show={showInviteUserModal} 
        onClose={() => toggleShowInviteUserModal(false)}
        canInviteAdmin={isSuper}
        inviteUser = {inviteUser}
      />
    </>
  )
}

export default UsersPage; 