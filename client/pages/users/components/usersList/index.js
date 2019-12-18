import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { actions } from 'pages/persons/actions';
import DataGrid from 'shared/components/dataGrid';

function linkFormatter (cell, row) {
  return (
    <Link href={`/persons/${row._id}`}>
      <a>{ cell }</a>
    </Link>
  )
}

const columns = [{
  dataField: 'fullName',
  text: 'Name',
  formatter: linkFormatter
}, {
  dataField: 'role',
  text: 'Role',
  searchable: false
}, {
  dataField: 'active',
  text: 'Is Active',
  searchable: false
}];

const UsersList = ({ users }) => {
  const dispatch = useDispatch();
  const { pagination, error, loading } = useSelector(state => state.users);

  const onUserGet = (payload) => dispatch(actions.getUsers(payload));
  const onUserDelete = (records) => dispatch(actions.deleteUsers(records));

  return (
    <DataGrid
      tableName="user"
      data={users} 
      columns={columns} 
      error={error} 
      loading={loading} 
      pagination={pagination}
      onItemsGet={onUserGet}
      onItemsDelete={onUserDelete}
    />
  )
}

export default UsersList;
