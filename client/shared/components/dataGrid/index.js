import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RemotePagination from 'shared/components/pagination';

const DataGrid = (props) => {
  const {
    data,
    tableName,
    columns,
    error,
    loading,
    pagination,
    onItemsGet,
    onItemsDelete,
    onEdit,
    hideSelectColumn
  } = props;

  const [ selectedRecords, setSelectedRecords ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');

  const hasData = !!data.length;

  if (error) return null;
  if (loading) return null;

  const handleOnSelect = (row, isSelect) => {
    setSelectedRecords(records => {
      if (isSelect) {
        return [...records, row];
      }
      return records.filter(record => record._id !== row._id);
    });
  };

  const handleOnSelectAll = (isSelect, rows) => {
    setSelectedRecords(isSelect ? rows : []);
  };

  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const onTableChange = (type, args) => {
    const { page, searchTerm, cellEdit } = args;

    if (type === 'pagination') {
      onItemsGet({ offset: page - 1 });
    }

    if (type === 'search') {
      onItemsGet({ searchTerm });
    }

    if (type === 'cellEdit') {
      onEdit && onEdit({
        id: cellEdit.rowId,
        [cellEdit.dataField]: cellEdit.newValue
      });
    }
  };

  return (
    <>
      <Card>
        { hasData
          && (
          <>
            <Card.Header>
              <Row>
                <Col>
                  <InputGroup>
                    <FormControl
                      placeholder={`Find ${tableName}`}
                      onChange={onSearchChange}
                      value={searchTerm}
                    />

                    <InputGroup.Append>
                      <Button
                        variant="primary"
                        disabled={!searchTerm}
                        onClick={() => onTableChange('search', { searchTerm })}
                      >
                        Search
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Col>

                <Col>
                  <InputGroup>
                    <FormControl
                      as="select"
                      value={pagination.sort}
                      onChange={(e) => onItemsGet({ sort: e.target.value })}
                    >
                      <option value="ascending">A to Z</option>
                      <option value="descending">Z to A</option>
                      <option value="newest">Newest</option>
                      <option value="older">Older</option>
                    </FormControl>

                    { !hideSelectColumn
                      && (
                      <InputGroup.Append>
                        <Button
                          onClick={() => onItemsDelete(selectedRecords)}
                          size="sm"
                          variant="secondary"
                          disabled={!selectedRecords.length}
                        >
                          <FontAwesomeIcon icon="trash-alt" /> &nbsp; Delete {tableName}s
                        </Button>
                      </InputGroup.Append>
                      )}
                  </InputGroup>
                </Col>
              </Row>
            </Card.Header>

            <Card.Body>
              <RemotePagination
                data={ data }
                columns={columns}
                pagination={pagination}
                hideSelectColumn={hideSelectColumn}
                onTableChange={ onTableChange }
                handleOnSelect={ handleOnSelect }
                handleOnSelectAll={ handleOnSelectAll }
              />
            </Card.Body>
          </>
          )}

        { !hasData
          && (
          <Card.Body>
            <Card.Text className="text-center">
              There are no {tableName}s yet.
            </Card.Text>
          </Card.Body>
          )}
      </Card>

      <style global jsx>{`
        .react-bootstrap-table .table th {
          border-top: 0;
        }
      `}</style>
    </>
  );
};

export default DataGrid;
