import React from 'react';
import DataGrid from 'shared/components/dataGrid';

const columns = [{
  dataField: 'name',
  text: 'Name',
  editable: false
}];

const ProfessionsList = (props) => {
  const {
    professions,
    error,
    pagination,
    onProfessionGet,
    onProfessionDelete
  } = props;

  return (
    <DataGrid
      tableName="profession"
      data={professions}
      columns={columns}
      error={error}
      pagination={pagination}
      onItemsGet={onProfessionGet}
      onItemsDelete={onProfessionDelete}
    />
  );
};

export default ProfessionsList;
