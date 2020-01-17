import React from 'react';
import Head from 'next/head';

function Users () {
  return (
    <div className="users-page">
      <Head>
        <title>Users</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      
      <div>
        <div>Useres List</div>
      </div>
    </div>
  )
};

export default Users;