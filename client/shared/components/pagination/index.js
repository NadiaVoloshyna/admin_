import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

const RemotePagination = ({ data, columns, onTableChange, handleOnSelect, handleOnSelectAll, pagination }) => {
  const selectRow = {
    mode: 'checkbox',
    clickToSelect: false,
    selectColumnPosition: 'right',
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll
  };

  return (
    <div>
      <PaginationProvider
        pagination={
          paginationFactory({
            custom: true,
            page: (pagination.offset / pagination.limit) + 1,
            sizePerPage: pagination.limit,
            totalSize: pagination.total
          })
        }
      >
        {
          ({
            paginationProps,
            paginationTableProps
          }) => {
            return (
              <div>
                <ToolkitProvider
                  keyField="_id"
                  data={ data }
                  columns={ columns }
                  search
                >
                  {
                    toolkitprops => (
                      <div>
                        <BootstrapTable
                          bootstrap4
                          bordered={false}
                          hover
                          remote
                          selectRow={ selectRow }
                          onTableChange={ onTableChange }
                          { ...toolkitprops.baseProps }
                          { ...paginationTableProps }
                        />
                      </div>
                    )
                  }
                </ToolkitProvider>
                <div>
                  <PaginationListStandalone
                    { ...paginationProps }
                    dataSize={pagination.total}
                  />
                </div>
              </div>
            )
          }
        }
      </PaginationProvider>
    </div>
  );
}

export default RemotePagination;