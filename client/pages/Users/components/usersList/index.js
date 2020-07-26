import React from 'react';
import { shape, arrayOf, func, bool } from 'prop-types';
import DataGrid from 'shared/components/dataGrid';
import { PaginationType, UsersType } from 'shared/prop-types';

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

UsersList.propTypes = {
  users: arrayOf(UsersType).isRequired,
  pagination: shape(PaginationType).isRequired,
  onUsersGet: func,
  onEdit: func,
  error: bool,
  loading: bool,
  isSuper: bool.isRequired
};

UsersList.defaultProps = {
  onUsersGet: () => {},
  onEdit: () => {},
  error: false,
  loading: false,
};

export default UsersList;
