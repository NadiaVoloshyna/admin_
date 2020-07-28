import React from 'react';
import { shape, arrayOf, bool, func } from 'prop-types';
import DataGrid from 'shared/components/dataGrid';
import { PaginationType, ProfessionType } from 'shared/prop-types';

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

ProfessionsList.propTypes = {
  professions: arrayOf(shape(ProfessionType)).isRequired,
  error: bool,
  pagination: shape(PaginationType).isRequired,
  onProfessionGet: func,
  onProfessionDelete: func
};

ProfessionsList.defaultProps = {
  onProfessionGet: () => {},
  onProfessionDelete: () => {},
  error: false
};

export default ProfessionsList;
