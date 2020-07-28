import React, { useState } from 'react';
import { shape, arrayOf, func, bool } from 'prop-types';
import Link from 'next/link';
import format from 'date-fns/format';
import DataGrid from 'shared/components/dataGrid';
import StatusBadge from 'shared/components/statusBadge';
import ShouldDeletePersonsModal from 'pages/Persons/components/shouldDeletePersonsModal';
import { PaginationType, Person } from 'shared/prop-types';

function linkFormatter(cell, row) {
  return (
    <Link href={`/persons/${row._id}`}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>{ cell }</a>
    </Link>
  );
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

const PersonsList = (props) => {
  const {
    hideSelectColumn,
    persons,
    pagination,
    onPersonsGet,
    onDelete,
    error,
    loading
  } = props;

  const [ showModal, setShowModal ] = useState(false);
  const [ toDelete, setToDelete ] = useState([]);

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
        onItemsGet={onPersonsGet}
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
  );
};

PersonsList.propTypes = {
  hideSelectColumn: bool,
  persons: arrayOf(shape(Person)).isRequired,
  pagination: shape(PaginationType).isRequired,
  onPersonsGet: func,
  onDelete: func,
  error: bool,
  loading: bool
};

PersonsList.defaultProps = {
  hideSelectColumn: false,
  onPersonsGet: () => {},
  onDelete: () => {},
  error: false,
  loading: false
};

export default PersonsList;
