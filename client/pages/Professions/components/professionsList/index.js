import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from 'pages/Professions/actions';
import DataGrid from 'shared/components/dataGrid';

const columns = [{
  dataField: 'name',
  text: 'Name',
  editable: false
}];

const ProfessionsList = () => {
  const dispatch = useDispatch();
  const { 
    professions, 
    error, 
    loading, 
    pagination,
  } = useSelector(state => state.professions);

  const onProfessionGet = (payload) => dispatch(actions.getProfessions(payload));
  const onProfessionDelete = (records) => dispatch(actions.deleteProfessions(records))

  return (
    <DataGrid
      tableName="profession"
      data={professions} 
      columns={columns} 
      error={error} 
      loading={loading} 
      pagination={pagination}
      onItemsGet={onProfessionGet}
      onItemsDelete={onProfessionDelete}
    />
  )
}

export default ProfessionsList;
