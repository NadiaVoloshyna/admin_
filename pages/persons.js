import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link'
import { connect } from 'react-redux';
import Layout from 'components/layout';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deletePersons } from '../store/actions/person';

const usePage = () => {
  const state = useSelector(({persons}) => ({
    persons: persons.persons,
  }));

  return { ...state };
}

const PersonsList = () => {
  const dispatch = useDispatch();
  const { persons, error, loading } = usePage();
  const [ selectedRecords, setSelectedRecords ] = useState([]);
  
  if (!persons.length) return null;
  if (error) return null;
  if (loading) return null;

  return (
    <div className="card">
      <div className="card-header">
        <Button 
          onClick={() => dispatch(deletePersons(selectedRecords))} 
          size="sm"
          variant="secondary"
          disabled={!selectedRecords.length}
        >
          <FontAwesomeIcon icon='trash-alt' /> &nbsp; Delete Persons
        </Button>
      </div>
      <table className="table table-hover">
        <tbody>
          {
            persons.map(item => (
              <tr key={item._id}>
                <td>
                <Form.Check
                  type="checkbox"
                  onChange={(e) => {
                    const isChecked = e.target.checked;

                    setSelectedRecords(records => {
                      if (isChecked) {
                        return [...records, item._id]
                      } else {
                        return records.filter(record => record !== item._id)
                      }
                    });
                  }}
                  id={item._id}
                />
                </td>
                <td>
                  <Link href={`/persons/${item._id}`}>
                    <a>{ item.name }</a>
                  </Link>
                </td>
                <td>{ item.created }</td>
              </tr>
            ))
          }
        </tbody>
      </table>

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

const Persons = () => {
  return (
    <div>
      <Head>
        <title>Persons</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout activePage="Persons">
        <div className="card mb-5">
          <div className="card-body d-flex justify-content-end">
            <a className="btn btn-primary" href="/persons/new">Create Post</a>
          </div>
        </div>

        <PersonsList />
      </Layout>
    </div>
  )
}

Persons.getInitialProps = ({ ctx }) => {
  const  { store } = ctx;

  store.dispatch({
    type: 'PERSONS_INITIAL_STATE',
    payload: {
      bla: 'bla',
      test: 'test'
    }
  })
  
  store.dispatch({
    type: 'GET_PERSONS'
  });
}

export default connect()(Persons);
