import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from 'pages/Persons/actions';
import Link from 'next/link';
import format from 'date-fns/format';
import DataGrid from 'shared/components/dataGrid';
import StatusBadge from 'shared/components/statusBadge';
import ShouldDeletePersonsModal from 'pages/Persons/components/shouldDeletePersonsModal';

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
}, {
  dataField: 'status',
  text: 'Status',
  searchable: false,
  editable: false,
  formatter: (cell) => <StatusBadge status={cell} />
}];

const PersonsList = ({ onDelete, hideSelectColumn }) => {
  const [ showModal, setShowModal ] = useState(false);
  const [ toDelete, setToDelete ] = useState([]);
  const dispatch = useDispatch();
  const personsState = useSelector(state => state.persons);
  const { persons, pagination, error, loading } = personsState;


  const onPersonGet = (payload) => dispatch(actions.getPersons(payload));

  const onPersonDelete = (records) => {
    setToDelete(records);
    setShowModal(true);
  };

  const onConfirm = () => {
    setShowModal(false);
    onDelete(toDelete);
  };
  
  const onDiscard = () => setShowModal(false);

  return (
    <>
      <DataGrid
        tableName="person"
        data={persons} 
        columns={columns} 
        error={error} 
        loading={loading} 
        pagination={pagination}
        onItemsGet={onPersonGet}
        onItemsDelete={onPersonDelete}
        hideSelectColumn={hideSelectColumn}
      />
      <ShouldDeletePersonsModal 
        show={showModal}
        persons={toDelete}
        onConfirm={onConfirm}
        onDiscard={onDiscard}
      />
    </>
  )
}

export default PersonsList;
