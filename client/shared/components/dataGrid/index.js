import React, { useState } from 'react';
import { arrayOf, object, shape, func } from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import useListDataFetch from 'shared/hooks/useListDataFetch';
import { TableColumnType } from '../../prop-types';
import * as utils from './utils';

const { checkboxRenderer, headerCheckboxRenderer, sortingConfig } = utils;

const DataGrid = (props) => {
  const { data, rowClasses, rowEvents, headerConfig } = props;
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
            className="material-icons cur-pointer"
          >{ item.icon }</span>
        ))}
      </div>
    );
  };
  // Columns config
  const columns = props.columns.map(item => {
    // clone item so we don't override original one
    const column = { ...item };

    // add sorting config if column is sortable
    if (column.sort && !selectedRecords.length) {
      column.sortingConfig = sortingConfig;
    }

    // get column specific formatter
    if (column.formatter) {
      column.formatter = utils[`${column.formatter}Formatter`];
    }

    // hide column header when any row is selected if configured
    // this will show actions in the header
    if (column.hideHeadingOnSelect) {
      column.headerAttrs = {
        hidden: !!selectedRecords.length,
      };
    }

    // this is the wierd way to make actions column not sortable
    // we need it to remove `sorted` class from this column
    // trying to remove sorting from all columns breaks selection functionality
    if (!column.hideHeadingOnSelect && selectedRecords.length) {
      column.sort = false;
    }

    // add some meta like header formatter and turn off sorting if any row is selected
    if (selectedRecords.length) {
      column.headerFormatter = headerFormatter;
      column.selectedRecords = selectedRecords;
    }

    return column;
  });

  const onSelect = (row, isSelect) => {
    setSelectedRecords(records => {
      if (isSelect) {
        return [...records, row];
      }
      return records.filter(record => record._id !== row._id);
    });
  };

  const onSelectAll = (isSelect, rows) => {
    setSelectedRecords(isSelect ? rows : []);
  };

  const onTableChange = (type, config) => {
    type === 'sort' && onSort(config);
  };

  const selectRow = {
    mode: 'checkbox',
    bgColor: '#BEE7CF',
    clickToSelect: false,
    onSelect,
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
};

DataGrid.defaultProps = {
  data: [],
  rowClasses: () => {},
  rowEvents: {},
  headerConfig: [],
};

export default DataGrid;
