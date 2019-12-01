import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _debounce from 'lodash/debounce'
import { actions } from 'pages/persons/actions';
import RemotePagination from 'shared/components/pagination';
import format from 'date-fns/format';

const usePage = () => {
  const sharedState = useSelector(state => state.shared);
  return { pagination: sharedState };
}

function linkFormatter (cell, row) {
  return (
    <Link href={`/persons/${row._id}`}>
      <a>{ cell }</a>
    </Link>
  )
}

const columns = [{
  dataField: 'fullName',
  text: 'Name',
  formatter: linkFormatter
}, {
  dataField: 'role',
  text: 'Role',
  searchable: false
}, {
  dataField: 'active',
  text: 'Is Active',
  searchable: false
}];

const UsersList = ({ users }) => {
  const dispatch = useDispatch();
  const { pagination, sort } = usePage();
  const [ selectedRecords, setSelectedRecords ] = useState([]);
  
  if (!users.length) return null;

  const handleOnSelect = (row, isSelect) => {
    setSelectedRecords(records => {
      if (isSelect) {
        return [...records, row]
      } else {
        return records.filter(record => record._id !== row._id)
      }
    });
  }

  const handleOnSelectAll = (isSelect, rows) => {
    setSelectedRecords(isSelect ? rows : []);
  }

  const search = (searchTerm) => {
    dispatch(actions.getUsers({
      searchTerm
    }));
  }

  const debouncedSearch = _debounce(search, 2000);

  const handleTableChange = (type, args) => {
    const { page, searchText } = args;

    if (type === 'pagination') {
      dispatch(actions.getUsers({
        offset: page - 1
      }))
    } 

    if (type === 'search') {
      debouncedSearch(searchText);
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <Row>
          <Col>
            {/* <Button 
              onClick={() => dispatch(actions.deletePersons(selectedRecords))} 
              size="sm"
              variant="secondary"
              disabled={!selectedRecords.length}
            >
              <FontAwesomeIcon icon='trash-alt' /> &nbsp; Delete Persons
            </Button> */}
          </Col>
          <Col>
            <Form.Control 
              as="select"
              value={sort}
              onChange={(e) => dispatch(actions.getUsers({ sort: e.target.value }))}
            >
              <option value="ascending">A to Z</option>
              <option value="descending">Z to A</option>
              <option value="newest">Newest</option>
              <option value="older">Older</option>
            </Form.Control>
          </Col>
        </Row>
      </div>

      <RemotePagination
        data={ users }
        columns={columns}
        pagination={pagination}
        onTableChange={ handleTableChange }
        handleOnSelect={ handleOnSelect }
        handleOnSelectAll={ handleOnSelectAll }
      />

      <style jsx>{`
        .table {
          margin-bottom: 0;
        }
        .card-header {
          border-bottom: none;
        }
      `}</style>
    </div>
  )
}

export default UsersList;
