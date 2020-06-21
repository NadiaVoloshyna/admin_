import React  from 'react';
import { paginationState } from 'shared/state';
import UserAPI from 'pages/Users/api'; 
import UsersPage from 'pages/Users';

const Users = (props) => <UsersPage {...props}/>

Users.getInitialProps = async (ctx) => {
  const { req } = ctx; 
  const { offset, searchTerm, sort } = paginationState; 

  try {
    
    const response =  await UserAPI
    .setCookie(req)
    .getUsers(offset, searchTerm, sort);
 
    let { users, pagination } = await response.json(); 
   
    if (response.status !== 200) return { errorCode: response.status };
    
    pagination = { offset, searchTerm, sort, ...pagination };
 
     return { users, pagination };
  } catch (error) {
    console.error(error); 
  } finally {

  }
}

export default Users; 
