import React, { useState } from 'react';
import { shape, arrayOf } from 'prop-types';
import Head from 'next/head';
import { useAlert } from 'react-alert';
import Layout from 'shared/components/layout';
import useErrorHandler from 'shared/hooks/useErrorHandler';
import { ERROR_MESSAGES, WARNING_MESSAGES } from 'shared/constants';
import CreateDropdown from 'shared/components/createDropdown';
import ProfessionsList from 'pages/Professions/components/professionsList';
import ProfessionsAPI from 'pages/Professions/api';
import { PaginationType, ProfessionType } from 'shared/prop-types';

const ProfessionsPage = (props) => {
  const handleError = useErrorHandler();
  const alert = useAlert();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ professions, setProfessions ] = useState(props.professions);
  const [ pagination, setPagination ] = useState(props.pagination);

  const createProfession = async (payload) => {
    setIsLoading(true);
    const { value: name } = payload;

    try {
      const { data: profession, status } = await ProfessionsAPI.create({ name });

      if (status === 201) {
        setProfessions([ ...professions, profession ]);
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

  const onProfessionGet = async (payload) => {
    setIsLoading(true);

    const newPagination = { ...pagination, ...payload };
    const { offset, searchTerm, sort } = newPagination;

    try {
      const { data: { professions }, status } = await ProfessionsAPI.getProfessions(offset, searchTerm, sort);

      if (status === 200) {
        setProfessions(professions);
        setPagination(newPagination);
      }
    } catch (error) {
      handleError(error, ERROR_MESSAGES.PROFESSIONS_GET_PROFESSIONS);
    } finally {
      setIsLoading(false);
    }
  };

  const onProfessionDelete = async (records) => {
    setIsLoading(true);

    const ids = records.map(id => id._id);

    try {
      const response = await ProfessionsAPI.deleteProfessions(ids);

      if (response.status === 200) {
        setProfessions(professions.filter(profession => ids.indexOf(profession._id) === -1));
      }

      if (response.status !== 200) {
        throw new Error(response.message);
      }
    } catch (error) {
      handleError(error, ERROR_MESSAGES.PROFESSIONS_DELETE_PROFESSIONS);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Professions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout activePage="Professions">
        <Layout.Navbar className="mb-5">
          <div className="row">
            <div className="col-10 m-auto">
              <CreateDropdown
                onCreate={createProfession}
                buttonText="Create Profession"
                placeholder="Profession's name"
              />
            </div>
          </div>
        </Layout.Navbar>

        <Layout.Content loading={isLoading}>
          <ProfessionsList
            professions={professions}
            pagination={pagination}
            onProfessionGet={onProfessionGet}
            onProfessionDelete={onProfessionDelete}
          />
        </Layout.Content>
      </Layout>
    </div>
  );
};

ProfessionsPage.propTypes = {
  professions: arrayOf(shape(ProfessionType)).isRequired,
  pagination: shape(PaginationType).isRequired
};

export default ProfessionsPage;
