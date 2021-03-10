import React, { useState } from 'react';
import { shape, arrayOf, number } from 'prop-types';
import { useRouter } from 'next/router';
import { useAlert } from 'react-alert';
import Layout from 'shared/components/layout';
import useErrorHandler from 'shared/hooks/useErrorHandler';
import { ERROR_MESSAGES, WARNING_MESSAGES, PAGE_NAMES } from 'shared/constants';
import ProfessionsAPI from 'pages/Professions/api';
import { ProfessionType } from 'shared/prop-types';
import { UserType } from 'common/prop-types/authorization/user';
import SearchField from 'shared/components/searchField';
import Pagination from 'shared/components/pagination';
import Pager from 'shared/components/pager';
import DataGrid from 'shared/components/dataGrid';
import Filters from 'shared/components/filters';
import CreateProfessionDrawer from './components/createProfessionDrawer';
import dataGridColumns from './columns';

const ProfessionsPage = (props) => {
  const { user, professions, pages } = props;
  const handleError = useErrorHandler();
  const alert = useAlert();
  const router = useRouter();
  const [ isLoading, setIsLoading ] = useState(false);

  const createProfession = async (payload) => {
    setIsLoading(true);

    try {
      const { status } = await ProfessionsAPI.create(payload);

      if (status === 201) {
        await router.replace({
          pathname: router.pathname,
          query: router.query,
        });
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

  const onProfessionDelete = async (records) => {
    setIsLoading(true);

    const ids = records.map(id => id._id);

    try {
      await ProfessionsAPI.deleteProfessions(ids);
      await router.replace({
        pathname: router.pathname,
        query: router.query,
      });
    } catch (error) {
      handleError(error, ERROR_MESSAGES.PROFESSIONS_DELETE_PROFESSIONS);
    } finally {
      setIsLoading(false);
    }
  };

  const headerActions = () => (
    <div className="d-flex align-items-center">
      <a href="#" className="material-icons">delete</a>
    </div>
  );

  return (
    <div>
      <Layout activePage={PAGE_NAMES.PROFESSIONS} user={user}>
        <Layout.Navbar>
          <h2>Professions</h2>

          <div><SearchField /></div>

          <CreateProfessionDrawer
            onApply={createProfession}
            canCreate={user.create('professions')}
          />
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
            headerActions={headerActions}
            onDelete={onProfessionDelete}
          />
        </Layout.Content>

        <Layout.Footer>
          <Pager />

          <Pagination pages={pages} />
        </Layout.Footer>
      </Layout>
    </div>
  );
};

ProfessionsPage.propTypes = {
  professions: arrayOf(shape(ProfessionType)).isRequired,
  pages: number.isRequired,
  user: shape(UserType).isRequired,
};

export default ProfessionsPage;
