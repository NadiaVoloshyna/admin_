import React, { useState } from 'react';
import Head from 'next/head';
import Layout from 'shared/components/layout';
import CreateDropdown from 'shared/components/createDropdown';
import ProfessionsList from 'pages/Professions/components/professionsList';
import ProfessionsAPI from 'pages/Professions/api';

const ProfessionsPage = (props) => {
  const [ isLoading, setIsLoading ] = useState(false); 
  const [ professions, setProfessions ] = useState(props.professions);
  const [ pagination, setPagination ] = useState(props.pagination);

const createProfession = async (payload) => {
  setIsLoading(true);
  const { value: name } = payload;

  try {
    const response = await ProfessionsAPI.create({ name });
    const profession = await response.json();
    
    if (response.status === 201) {
      setProfessions([ ...professions, profession ]);
    }

    if (response.status === 409) {
      console.log('Duplicate profession');
    }
    
    if (response.status === 500) {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
}

const onProfessionGet = async (payload) => {
  setIsLoading(true);

  const newPagination = { ...pagination, ...payload };
  const { offset, searchTerm, sort } = newPagination;
  
  try {
    const response = await ProfessionsAPI.getProfessions(offset, searchTerm, sort);
    const professionsResponse = await response.json();
    
    if (response.status === 200) {
      setProfessions(professionsResponse.professions);
      setPagination(newPagination);
    }

    if (response.status === 500) {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

  const onProfessionDelete = async (records) => {
    const { professionsToDelete } = records;
    setIsLoading(true);
    const ids = professionsToDelete.map(id => id._id);
  
    try {
      const response = await ProfessionsAPI.deleteProfessions(ids);

      if (response.status === 200) {
        setProfessions(professions.filter(profession => ids.indexOf(profession._id) === -1));
      }

      if (response.status !== 200) {
        throw new Error(response.message);
      }
    } catch (err) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Professions</title>
        <link rel='icon' href='/favicon.ico' />
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

        <Layout.Content>
          <ProfessionsList
          professions={professions}
          pagination={pagination}
          loading={isLoading}
          onProfessionGet={onProfessionGet}
          onProfessionDelete={onProfessionDelete}
          />
        </Layout.Content>
      </Layout>
    </div>
  )
}

export default ProfessionsPage;
