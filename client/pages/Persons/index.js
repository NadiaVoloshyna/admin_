import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Layout from 'shared/components/layout';
import PersonsList from 'pages/Persons/components/personsList';
import DuplicateModal from 'pages/Persons/components/duplicateModal';
import CreateDropdown from 'shared/components/createDropdown';
import PersonsApi from 'pages/Persons/api';
import { actions as sharedActions } from 'shared/actions';

const PersonsPage = ({ user, persons, pagination }) => {
  const [ isPersonExist, setIsPersonExist ] = useState(false);
  const [ duplicate, setDuplicate ] = useState({});

  const dispatch = useDispatch();
  const [personsState, setPersons] = useState(persons);
  const [paginationState, setPaginationState] = useState(pagination);

  const canCreatePerson = user.permissions.createOwn('person');
  const canDeletePerson = user.permissions.deleteAny('person');

  const onPersonsGet = async (payload) => {
    dispatch(sharedActions.toggleIsLoading());

    const { offset, searchTerm, sort } = { ...paginationState, ...payload };

    try {
      const { persons, pagination } = await PersonsApi.getPersons(offset, searchTerm, sort);
      setPersons(persons);
      setPaginationState({ offset, searchTerm, sort, ...pagination });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(sharedActions.toggleIsLoading());
    }
  };

  const onDelete = async (persons) => {
    dispatch(sharedActions.toggleIsLoading());

    const ids = persons.map(id => id._id);

    try {
      await PersonsApi.deletePersons(ids);
      persons = persons.filter(person => ids.find(id => id === person._id));
      setPersons(persons);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(sharedActions.toggleIsLoading());
    }
  };

  const onPersonCreate = async (data) => {
    dispatch(sharedActions.toggleIsLoading());

    const { value: name } = data;

    try {
      const response = await PersonsApi.create({ name });
      const person = await response.json();

      if (response.status === 301 || response.status === 302) {
        window.location = `persons/${person.id}`;
        return;
      }
      
      if (response.status === 409) {
        setDuplicate({
          id: person.id,
          name: person.name
        });
        setIsPersonExist(true);
      }

      if (response.status === 500) {
        throw Error(response.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(sharedActions.toggleIsLoading());
    }
  }

  return (
    <div>
      <Head>
        <title>Persons</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout activePage="Persons">
        <Layout.Navbar className="mb-5">
          { canCreatePerson.granted &&
            <CreateDropdown
              buttonText="Create Person"
              placeholder="Person's name"
              onCreate={onPersonCreate}
            />
          }
        </Layout.Navbar>

        <Layout.Content>
          <PersonsList
            onPersonsGet={onPersonsGet}
            onDelete={onDelete}
            hideSelectColumn={!canDeletePerson.granted}
            persons={personsState}
            pagination={paginationState}
          />
        </Layout.Content>
      </Layout>

      <DuplicateModal 
        show={isPersonExist}
        onClose={setIsPersonExist}
        duplicate={duplicate}
      />
    </div>
  )
}

export default PersonsPage;
