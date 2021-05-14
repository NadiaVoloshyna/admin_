import React, { useState } from 'react';
import { shape, arrayOf, number } from 'prop-types';
import { useAlert } from 'react-alert';
import Layout from 'shared/components/layout';
import useErrorHandler from 'shared/hooks/useErrorHandler';
import useListDataFetch from 'shared/hooks/useListDataFetch';
import { ERROR_MESSAGES, WARNING_MESSAGES, PAGE_NAMES } from 'shared/constants';
import ProfessionsAPI from 'pages/Professions/api';
import { ProfessionType } from 'shared/prop-types';
import { UserType } from 'common/prop-types/authorization/user';
import SearchField from 'shared/components/searchField';
import Pagination from 'shared/components/pagination';
import Pager from 'shared/components/pager';
import UAPrompt from 'shared/components/prompt';
import DataGrid from 'shared/components/dataGrid';
import Filters from 'shared/components/filters';
import CreateProfessionDrawer from './components/createProfessionDrawer';
import dataGridColumns from './columns';

const ProfessionsPage = (props) => {
  const { user, professions, pages } = props;

  const handleError = useErrorHandler();
  const { refetchQuery } = useListDataFetch();
  const alert = useAlert();

  const [ isLoading, setIsLoading ] = useState(false);
  const [ professionsToDelete, setProfessionsToDelete ] = useState([]);
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);

  const canCreate = user.create('professions');
  const canDelete = user.delete('professions');

  const createProfession = async (payload) => {
    if (!canCreate) return;
    setIsLoading(true);

    try {
      const { status } = await ProfessionsAPI.create(payload);

      if (status === 201) {
        await refetchQuery();
      }

      if (status === 409) {
        alert.warning(WARNING_MESSAGES.PROFESSIONS_DUPLICATE_PROFESSION);
      }
    } catch (error) {
      handleError(error, ERROR_MESSAGES.PROFESSIONS_CREATE_PROFESSION);
    } finally {
      setIsLoading(false);
    }
  };

  const onProfessionDelete = async () => {
    if (!canDelete) return;

    setIsDeleteModalOpen(false);
    setIsLoading(true);

    try {
      const ids = professionsToDelete.map(id => id._id);

      await ProfessionsAPI.deleteProfessions(ids);
      await refetchQuery();
    } catch (error) {
      handleError(error, ERROR_MESSAGES.PROFESSIONS_DELETE_PROFESSIONS);
    } finally {
      setIsLoading(false);
    }
  };

  const showModal = (records) => {
    setIsDeleteModalOpen(true);
    setProfessionsToDelete(records);
  };

  const hideModal = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteProfessionsModalBody = () => (
    <ul>
      { professionsToDelete.map(item => <li key={item.name} className="text-dark">{ item.name }</li>) }
    </ul>
  );

  const headerConfig = [{
    icon: 'delete',
    action: showModal,
  }];

  return (
    <div>
      <Layout activePage={PAGE_NAMES.PROFESSIONS} user={user}>
        <Layout.Navbar>
          <h2>Professions</h2>

          <div><SearchField /></div>

          { canCreate && (
            <CreateProfessionDrawer
              onApply={createProfession}
              canCreate={user.create('professions')}
            />
          )}
        </Layout.Navbar>

        <Layout.Content isLoading={isLoading}>
          <div className="mb-4">
            <Filters
              items={{
                all: 'All',
                me: 'Created by me',
              }}
              name="createdBy"
            />
          </div>
          <DataGrid
            data={professions}
            columns={dataGridColumns}
            headerConfig={headerConfig}
          />
        </Layout.Content>

        <Layout.Footer>
          <Pager />

          <Pagination pages={pages} />
        </Layout.Footer>
      </Layout>

      <UAPrompt
        show={isDeleteModalOpen}
        titleContent="Ви дійсно хочете видалити наступні професії?"
        bodyContent={deleteProfessionsModalBody}
        onSubmit={onProfessionDelete}
        onHide={hideModal}
      />
    </div>
  );
};

ProfessionsPage.propTypes = {
  professions: arrayOf(shape(ProfessionType)).isRequired,
  pages: number.isRequired,
  user: shape(UserType).isRequired,
};

export default ProfessionsPage;
