import React, { useState } from 'react';
import { shape, arrayOf, number } from 'prop-types';
import { useRouter } from 'next/router';
import Layout from 'shared/components/layout';
import useErrorHandler from 'shared/hooks/useErrorHandler';
import useListDataFetch from 'shared/hooks/useListDataFetch';
import { ERROR_MESSAGES, PAGE_NAMES } from 'shared/constants';
import DuplicateModal from 'pages/Persons/components/duplicateModal';
import PersonsApi from 'pages/Persons/api';
import { Person } from 'shared/prop-types';
import { UserType } from 'common/prop-types/authorization/user';
import Pagination from 'shared/components/pagination';
import Pager from 'shared/components/pager';
import SearchField from 'shared/components/searchField';
import DataGrid from 'shared/components/dataGrid';
import UAPrompt from 'shared/components/prompt';
import columns from './columns';
import CreateButton from './components/createButton';
import FilterPersonsDrawer from './components/filterDrawer';

const PersonsPage = ({ user, persons, pages }) => {
  const handleError = useErrorHandler();
  const { refetchQuery } = useListDataFetch();
  const router = useRouter();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isPersonExist, setIsPersonExist ] = useState(false);
  const [ duplicate, setDuplicate ] = useState({});
  const [ personsToDelete, setPersonsToDelete ] = useState([]);
  const [ isShouldDeletePersonsModalOpen, setIsOpen ] = useState(false);

  const canCreate = user.create('persons');
  const canDelete = user.deleteOwn('persons');

  const onDelete = async () => {
    if (!canDelete) return;
    setIsOpen(false);
    setIsLoading(true);

    try {
      const ids = personsToDelete.map(item => item._id);
      await PersonsApi.deletePersons(ids);
      await refetchQuery();
    } catch (error) {
      handleError(error, ERROR_MESSAGES.PERSONS_DELETE_PERSONS);
    } finally {
      setIsLoading(false);
    }
  };

  const showModal = (records) => {
    setPersonsToDelete(records);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const deletePersonsModalBody = () => {
    return (
      <>
        <ul>
          { personsToDelete.map(item => <li key={item.name} className="text-dark">{ item.name }</li>) }
        </ul>
        <div className="text-danger">
          Видаливши персони ви також видалите документ цієї персони а також файли які належать цій персоні
        </div>
      </>
    );
  };

  const onPersonCreate = async (name) => {
    if (!canCreate) return;

    setIsLoading(true);

    try {
      const { data: person, status } = await PersonsApi.create({ name });

      if (status === 301 || status === 302) {
        window.location = `persons/${person.id}`;
        return;
      }
    } catch (error) {
      if (error.response.status === 409) {
        setDuplicate({
          id: error.response.data.id,
          name: error.response.data.name,
        });
        setIsPersonExist(true);
      } else {
        handleError(error, ERROR_MESSAGES.PERSONS_CREATE_PERSON);
      }
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

  const headerConfig = [{
    icon: 'delete',
    action: showModal,
  }];

  return (
    <div>
      <Layout activePage={PAGE_NAMES.PERSONS} user={user}>
        <Layout.Navbar>
          <h2>Persons</h2>

          <div className="d-flex">
            <SearchField />
            <FilterPersonsDrawer />
          </div>

          { canCreate && <CreateButton onCreate={onPersonCreate} /> }
        </Layout.Navbar>

        <Layout.Content isLoading={isLoading}>
          <DataGrid
            data={persons}
            columns={columns}
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

      <UAPrompt
        show={isShouldDeletePersonsModalOpen}
        titleContent="Ви дійсно хочете видалити наступні персони?"
        bodyContent={deletePersonsModalBody}
        onSubmit={onDelete}
        onHide={hideModal}
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
