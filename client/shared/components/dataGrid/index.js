import React, { useState } from 'react';
import { arrayOf, object, shape, string } from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import useListDataFetch from 'shared/hooks/useListDataFetch';
import { TableColumnType } from '../../prop-types';
import * as utils from './utils';

const { checkboxRenderer, sortingConfig } = utils;

const DataGrid = (props) => {
  const { data, rowClasses } = props;
  const [ selectedRecords, setSelectedRecords ] = useState([]);

  // eslint-disable-next-line
  console.log(selectedRecords);

  const defaultSorted = { dataField: 'created', order: 'desc' };

  const { addQueryParams, getQueryParams } = useListDataFetch();
  const sort = getQueryParams('sort');

  const onSort = ({ sortField, sortOrder }) => {
    if (!sort && defaultSorted.dataField === sortField && defaultSorted.order === sortOrder) return;
    addQueryParams('sort', [sortField, sortOrder]);
  };

  const columns = props.columns.map(item => ({
    ...item,
    ...(item.sort && sortingConfig),
    ...(item.formatter && { formatter: utils[`${item.formatter}Formatter`] })
  }));

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
    clickToSelect: false,
    onSelect,
    onSelectAll,
    selectionHeaderRenderer: checkboxRenderer,
    selectionRenderer: checkboxRenderer,
  };

  return (
    <>
      <BootstrapTable
        keyField="_id"
        data={ data }
        columns={ columns }
        bootstrap4
        bordered={false}
        remote
        selectRow={ selectRow }
        onTableChange={onTableChange}
        defaultSorted={[defaultSorted]}
        rowClasses={rowClasses}
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
  rowClasses: string,
};

DataGrid.defaultProps = {
  data: [],
  rowClasses: '',
};

export default DataGrid;
