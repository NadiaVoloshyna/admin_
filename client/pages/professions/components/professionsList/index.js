import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _debounce from 'lodash/debounce'
import { actionTypes, actionCreator } from 'pages/professions/actions';
import RemotePagination from 'shared/components/pagination';

const usePage = () => {
  const state = useSelector(state => state.professions);
  return { ...state };
}

const columns = [{
  dataField: 'name',
  text: ''
}];

const ProfessionsList = () => {
  const dispatch = useDispatch();
  const { professions, error, loading, pagination, sort } = usePage();
  
  const [ selectedRecords, setSelectedRecords ] = useState([]);
  const [ profession, setProfession ] = useState('');
  const [ searchTerm, setSearchTerm ] = useState('');
  
  if (error) return null;
  if (loading) return null;

  const handleOnSelect = (row, isSelect) => {
    setSelectedRecords(records => {
      if (isSelect) {
        return [...records, row._id]
      } else {
        return records.filter(record => record !== row._id)
      }
    });
  }

  const handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r._id);
    
    if (isSelect) {
      setSelectedRecords(ids);
    } else {
      setSelectedRecords([]);
    }
  }

  const handleTableChange = (type, args) => {
    const { page, searchTerm } = args;

    if (type === 'pagination') {
      dispatch(actionCreator(actionTypes.GET_PROFESSIONS, {
        offset: page - 1
      }))
    } 

    if (type === 'search') {
      dispatch(actionCreator(actionTypes.GET_PROFESSIONS, {
        searchTerm
      }));
    }
  }

  const onProfessionCreate = () => {
    dispatch(actionCreator(actionTypes.CREATE_PROFESSION, profession));
    setProfession('');
  }

  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <>
      <Card>
        <Card.Header>
          <InputGroup>
            <FormControl 
              placeholder="Type profession name"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            />
            <InputGroup.Append>
              <Button 
                variant="primary"
                onClick={onProfessionCreate}
              >Add Profession</Button>
            </InputGroup.Append>
          </InputGroup>
        </Card.Header>

        <Card.Header>
          <Row>
            <Col>
              <InputGroup>
                <FormControl 
                  placeholder="Find profession"
                  onChange={onSearchChange}
                  value={searchTerm}
                />

                <InputGroup.Append>
                  <Button
                    variant="primary"
                    disabled={!searchTerm}
                    onClick={() => handleTableChange('search', { searchTerm })}
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
                  value={sort}
                  onChange={(e) => dispatch(actionCreator(actionTypes.GET_PROFESSIONS, { sort: e.target.value }))}
                >
                  <option value="ascending">A to Z</option>
                  <option value="descending">Z to A</option>
                  <option value="newest">Newest</option>
                  <option value="older">Older</option>
                </FormControl>

                <InputGroup.Append>
                  <Button 
                    onClick={() => dispatch(actionCreator(actionTypes.DELETE_PROFESSIONS, selectedRecords))} 
                    size="sm"
                    variant="secondary"
                    disabled={!selectedRecords.length}
                  >
                    <FontAwesomeIcon icon='trash-alt' /> &nbsp; Delete Professions
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          { !!professions.length &&
            <RemotePagination
              data={ professions }
              columns={columns}
              pagination={pagination}
              onTableChange={ handleTableChange }
              handleOnSelect={ handleOnSelect }
              handleOnSelectAll={ handleOnSelectAll }
            />
          }
          { !professions.length && 
            <Card.Text className="text-center">
              There are no professions yet.
            </Card.Text> 
          }
        </Card.Body>
      </Card>

      <style jsx>{`
        .table {
          margin-bottom: 0;
        }
        .card-header {
          border-bottom: none;
        }
      `}</style>
    </>
  )
}

export default ProfessionsList;
