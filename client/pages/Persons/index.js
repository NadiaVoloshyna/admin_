import React, { useState } from 'react';
import { shape, arrayOf, number } from 'prop-types';
import { useRouter } from 'next/router';
import Layout from 'shared/components/layout';
import useErrorHandler from 'shared/hooks/useErrorHandler';
import { ERROR_MESSAGES, PAGE_NAMES } from 'shared/constants';
import DuplicateModal from 'pages/Persons/components/duplicateModal';
import PersonsApi from 'pages/Persons/api';
import { Person } from 'shared/prop-types';
import { UserType } from 'common/prop-types/authorization/user';
import Pagination from 'shared/components/pagination';
import Pager from 'shared/components/pager';
import SearchField from 'shared/components/searchField';
import DataGrid from 'shared/components/dataGrid';
import columns from './columns';
import CreateButton from './components/createButton';
import FilterPersonsDrawer from './components/filterDrawer';

const PersonsPage = ({ user, persons, pages }) => {
  const handleError = useErrorHandler();
  const router = useRouter();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isPersonExist, setIsPersonExist ] = useState(false);
  const [ duplicate, setDuplicate ] = useState({});
  const [ personsState, setPersons ] = useState(persons);

  const canCreatePerson = user.create('persons');
  // const canDeletePerson = user.deleteOwn('persons');

  const onDelete = async (records) => {
    const recs = records.selectedRecords;

    // if (!canDeletePerson) return;

    setIsLoading(true);

    const ids = recs.map(id => id._id);

    try {
      await PersonsApi.deletePersons(ids);
      setPersons(personsState.filter(person => !ids.includes(person._id)));
    } catch (error) {
      handleError(error, ERROR_MESSAGES.PERSONS_DELETE_PERSONS);
    } finally {
      setIsLoading(false);
    }
  };

  const onPersonCreate = async (name) => {
    setIsLoading(true);

    try {
      const { data: person, status } = await PersonsApi.create({ name });

      if (status === 301 || status === 302) {
        window.location = `persons/${person.id}`;
        return;
      }

      if (status === 409) {
        setDuplicate({
          id: person.id,
          name: person.name,
        });
        setIsPersonExist(true);
      }
    } catch (error) {
      handleError(error, ERROR_MESSAGES.PERSONS_CREATE_PERSON);
    } finally {
      setIsLoading(false);
    }
  };

  const rowEvents = {
    onClick: (e, row) => {
      if (!user.read('user')) return;

      router.push({
        pathname: '/persons/[id]',
        query: { id: row._id },
      });
    },
  };

  const headerIcons = (records) => (
    <div className="d-flex align-items-center">
      <a href="#/" onClick={() => onDelete(records)} className="material-icons">delete</a>
    </div>
  );

  const headerConfig = {
    headerFormatter: headerIcons,
  };

  return (
    <div>
      <Layout activePage={PAGE_NAMES.PERSONS} user={user}>
        <Layout.Navbar>
          <h2>Persons</h2>

          <div className="d-flex">
            <SearchField />
            <FilterPersonsDrawer />
          </div>

          { canCreatePerson && <CreateButton onCreate={onPersonCreate} /> }
        </Layout.Navbar>

        <Layout.Content isLoading={isLoading}>
          <DataGrid
            data={persons}
            columns={columns}
            onDelete={onDelete}
            rowEvents={rowEvents}
            headerConfig={headerConfig}
          />
        </Layout.Content>

        <Layout.Footer>
          <Pager />
          <Pagination pages={pages} />
        </Layout.Footer>
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
  pages: number.isRequired,
};

export default PersonsPage;
