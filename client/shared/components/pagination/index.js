import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

const RemotePagination = (props) => {
  const {
    data,
    columns,
    onTableChange,
    handleOnSelect,
    handleOnSelectAll,
    pagination,
    hideSelectColumn
  } = props;

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: false,
    selectColumnPosition: 'right',
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll,
    hideSelectColumn
  };

  const activePage = (pagination.offset / pagination.limit) + 1;
  const shouldShowPagination = (pagination.total / pagination.limit) > 1;

  return (
    <>
      <PaginationProvider
        pagination={
          paginationFactory({
            custom: true,
            page: activePage,
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
                          cellEdit={ cellEditFactory({
                            mode: 'dbclick',
                            blurToSave: true
                          }) }
                          { ...toolkitprops.baseProps }
                          { ...paginationTableProps }
                        />
                      </div>
                    )
                  }
                </ToolkitProvider>
                <div>
                  { !!shouldShowPagination
                    && (
                    <PaginationListStandalone
                      { ...paginationProps }
                      dataSize={pagination.total}
                    />
                    )}
                </div>
              </div>
            );
          }
        }
      </PaginationProvider>

      <style global jsx>{`
        .react-bootstrap-table table {
          margin: 0;
        }

        .react-bootstrap-table table th {
          font-size: 14px;
        }
      `}</style>
    </>
  );
};

export default RemotePagination;
