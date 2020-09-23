import React, { useState } from 'react';
import { shape, arrayOf } from 'prop-types';
import Head from 'next/head';
import Layout from 'shared/components/layout';
import useErrorHandler from 'shared/hooks/useErrorHandler';
import { ERROR_MESSAGES } from 'shared/constants';
import PersonsList from 'pages/Persons/components/personsList';
import DuplicateModal from 'pages/Persons/components/duplicateModal';
import CreateDropdown from 'shared/components/createDropdown';
import PersonsApi from 'pages/Persons/api';
import { PaginationType, Person } from 'shared/prop-types';
import { UserType } from 'common/prop-types/authorization/user';

const PersonsPage = ({ user, persons, pagination }) => {
  const handleError = useErrorHandler();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isPersonExist, setIsPersonExist ] = useState(false);
  const [ duplicate, setDuplicate ] = useState({});
  const [ personsState, setPersons ] = useState(persons);
  const [ paginationState, setPaginationState ] = useState(pagination);

  const canCreatePerson = user.create('persons');
  const canDeletePerson = user.deleteOwn('persons');

  const onPersonsGet = async (payload) => {
    setIsLoading(true);

    const { offset, searchTerm, sort } = {
      ...paginationState,
      ...payload
    };

    try {
      const { data: { persons, pagination } } = await PersonsApi.getPersons(offset, searchTerm, sort);
      setPersons(persons);
      setPaginationState({ offset, searchTerm, sort, ...pagination });
    } catch (error) {
      handleError(error, ERROR_MESSAGES.PERSONS_GET_PERSONS);
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async (records) => {
    setIsLoading(true);

    const ids = records.map(id => id._id);

    try {
      await PersonsApi.deletePersons(ids);
      setPersons(personsState.filter(person => !ids.includes(person._id)));
    } catch (error) {
      handleError(error, ERROR_MESSAGES.PERSONS_DELETE_PERSONS);
    } finally {
      setIsLoading(false);
    }
  };

  const onPersonCreate = async (data) => {
    setIsLoading(true);

    const { value: name } = data;

    try {
      const { data: person, status } = await PersonsApi.create({ name });

      if (status === 301 || status === 302) {
        window.location = `persons/${person.id}`;
        return;
      }

      if (status === 409) {
        setDuplicate({
          id: person.id,
          name: person.name
        });
        setIsPersonExist(true);
      }
    } catch (error) {
      handleError(error, ERROR_MESSAGES.PERSONS_CREATE_PERSON);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Persons</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout activePage="Persons">
        <Layout.Navbar className="mb-5">
          { canCreatePerson
            && (
            <CreateDropdown
              buttonText="Create Person"
              placeholder="Person's name"
              onCreate={onPersonCreate}
            />
            )}
        </Layout.Navbar>

        <Layout.Content isLoading={isLoading}>
          <PersonsList
            onPersonsGet={onPersonsGet}
            onDelete={onDelete}
            hideSelectColumn={!canDeletePerson}
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
  );
};

PersonsPage.propTypes = {
  user: shape(UserType).isRequired,
  persons: arrayOf(shape(Person)).isRequired,
  pagination: shape(PaginationType).isRequired
};

export default PersonsPage;
