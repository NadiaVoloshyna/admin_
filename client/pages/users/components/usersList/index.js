import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from 'pages/users/actions';
import DataGrid from 'shared/components/dataGrid';

const getColumns = (editable) => [{
  dataField: 'fullName',
  text: 'Name',
  editable: false
}, {
  dataField: 'role',
  text: 'Role',
  editable: false,
  searchable: false
}, {
  dataField: 'active',
  text: 'Is Active',
  searchable: false,
  editable,
  editor: {
    type: 'select',
    options: [{
      value: true,
      label: 'true'
    }, {
      value: false,
      label: 'false'
    }]
  }
}];

const UsersList = ({ users }) => {
  const dispatch = useDispatch();
  const { pagination, error, loading } = useSelector(state => state.users);
  const { isSuper } = useSelector(state => state.user);

  const columns = getColumns(isSuper);

  const onUsersGet = () => dispatch(actions.getUsers());
  const onEdit = (payload) => dispatch(actions.updateUser(payload));

  return (
    <DataGrid
      tableName="user"
      data={users}
      columns={columns}
      error={error}
      loading={loading}
      pagination={pagination}
      onItemsGet={onUsersGet}
      onEdit={onEdit}
      hideSelectColumn
    />
  );
};

export default UsersList;
