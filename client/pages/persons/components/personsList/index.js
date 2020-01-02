import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from 'pages/persons/actions';
import Link from 'next/link';
import format from 'date-fns/format';
import DataGrid from 'shared/components/dataGrid';

function linkFormatter (cell, row) {
  return (
    <Link href={`/persons/${row._id}`}>
      <a>{ cell }</a>
    </Link>
  )
}

const columns = [{
  dataField: 'name',
  text: 'Name',
  formatter: linkFormatter,
  editable: false
}, {
  dataField: 'created',
  text: 'Created',
  searchable: false,
  editable: false,
  formatter: (cell) => <span className="font-weight-light">{ format(new Date(cell), 'dd-MM-yyyy HH:MM') } </span>
}];

const PersonsList = () => {
  const dispatch = useDispatch();
  const personsState = useSelector(state => state.persons);
  const { persons, pagination, error, loading } = personsState;

  const onPersonGet = (payload) => dispatch(actions.getPersons(payload));
  const onPersonDelete = (records) => dispatch(actions.deletePersons(records));

  return (
    <DataGrid
      tableName="person"
      data={persons} 
      columns={columns} 
      error={error} 
      loading={loading} 
      pagination={pagination}
      onItemsGet={onPersonGet}
      onItemsDelete={onPersonDelete}
    />
  )
}

export default PersonsList;
