import React, { useState } from 'react';
import { arrayOf, object, shape, func } from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import useListDataFetch from 'shared/hooks/useListDataFetch';
import { TableColumnType } from '../../prop-types';
import * as utils from './utils';

const { checkboxRenderer, headerCheckboxRenderer, sortingConfig } = utils;

const DataGrid = (props) => {
  const { data, rowClasses, rowEvents, headerConfig, onSelect } = props;
  const [ selectedRecords, setSelectedRecords ] = useState([]);

  // eslint-disable-next-line

  const defaultSorted = { dataField: 'created', order: 'desc' };

  const { toggleQueryParams, getQueryParams } = useListDataFetch();
  const sort = getQueryParams('sort');

  // Sorting config
  const onSort = ({ sortField, sortOrder }) => {
    if (!sort && defaultSorted.dataField === sortField && defaultSorted.order === sortOrder) return;
    !selectedRecords.length && toggleQueryParams({ sort: [sortField, sortOrder] });
  };

  // Grid heading config
  const headerFormatter = (records) => {
    const { selectedRecords } = records;
    return (
      <div className="d-flex align-items-center">
        { headerConfig.map(item => (
          <span
            onClick={() => item.action(selectedRecords)}
            className="material-icons"
          >{ item.icon }</span>
        ))}
      </div>
    );
  };

  // Columns config
  const columns = props.columns.map(item => ({
    ...item,
    ...(item.sort && sortingConfig),
    ...(item.formatter && { formatter: utils[`${item.formatter}Formatter`] }),
    ...(item.hideHeadingOnSelect && { headerAttrs: { hidden: !!selectedRecords.length } }),
    ...(selectedRecords.length && { headerFormatter, selectedRecords }),
  }));

  const onSelectHandler = (row, isSelect) => {
    setSelectedRecords(records => {
      let updatedRecords;

      if (isSelect) {
        updatedRecords = [...records, row]; // merge selected to records in state
      } else {
        updatedRecords = records.filter(record => record._id !== row._id); // filter out selected records
      }
      onSelect(updatedRecords);
      return updatedRecords;
    });
  };

  const onSelectAll = (isSelect, rows) => {
    setSelectedRecords(isSelect ? rows : []);
    onSelect(rows);
  };

  const onTableChange = (type, config) => {
    type === 'sort' && onSort(config);
  };

  const selectRow = {
    mode: 'checkbox',
    bgColor: '#BEE7CF',
    clickToSelect: false,
    onSelect: onSelectHandler,
    onSelectAll,
    selectionHeaderRenderer: headerCheckboxRenderer,
    selectionRenderer: checkboxRenderer,
  };

  return (
    <>
      <BootstrapTable
        keyField="_id"
        data={ data }
        columns={columns}
        bootstrap4
        bordered={false}
        remote
        selectRow={ selectRow }
        onTableChange={onTableChange}
        defaultSorted={[defaultSorted]}
        rowClasses={rowClasses}
        rowEvents={rowEvents}
      />

      <style global jsx>{`
        .react-bootstrap-table .table th {
          border-top: 0;
          outline: none;
        }

        .react-bootstrap-table table {
          margin: 0;
        }

        .react-bootstrap-table table th i {
          font-size: 17px;
          margin-left: 10px;
          display: none;
        }

        .react-bootstrap-table table th.sortable {
          cursor: pointer;
        }

        .react-bootstrap-table table th.active,
        .react-bootstrap-table table th.sortable:hover {
          color: #27AE60;
        }

        .react-bootstrap-table table th.active i {
          color: #27AE60;
          display: inline;
        }
      `}</style>
    </>
  );
};

DataGrid.propTypes = {
  data: arrayOf(object),
  columns: arrayOf(shape(TableColumnType)).isRequired,
  rowClasses: func,
  rowEvents: shape,
  headerConfig: arrayOf(object),
  onSelect: func,
};

DataGrid.defaultProps = {
  data: [],
  rowClasses: () => {},
  rowEvents: {},
  headerConfig: [],
  onSelect: () => {},
};

export default DataGrid;
