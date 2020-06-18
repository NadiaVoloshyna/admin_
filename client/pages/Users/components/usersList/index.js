import React from 'react';
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

const UsersList = (props) => {
  const {
    users,
    pagination,
    onUsersGet,
    onEdit,
    error,
    loading,
    isSuper
  } = props;

  const columns = getColumns(isSuper);

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
