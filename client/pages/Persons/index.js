import React from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Layout from 'shared/components/layout';
import PersonsList from 'pages/Persons/components/personsList';
import CreateDropdown from 'shared/components/createDropdown';
import PersonsApi from 'pages/Persons/api';
import { actions } from 'pages/Persons/actions';
import { actions as sharedActions } from 'shared/actions';

const PersonsPage = ({ user }) => {
  const dispatch = useDispatch();
  const canCreatePerson = user.permissions.createOwn('person');
  const canDeletePerson = user.permissions.deleteAny('person');

  const onDelete = (persons) => {
    dispatch(sharedActions.toggleIsLoading());
    const ids = persons.map(id => id._id);

    PersonsApi.deletePersons(ids)
      .then(() => {
        dispatch(actions.deletePersonsSuccess(ids));
        dispatch(sharedActions.toggleIsLoading());
      })
      .catch(error => {
        dispatch(actions.deletePersonsFailed(error));
        dispatch(sharedActions.toggleIsLoading());
      });
  }

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
        await dispatch(actions.setDuplicateData({
          id: person.id,
          name: person.name
        }))
        await dispatch(actions.showDuplicatePersonModal(true));
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
            onDelete={onDelete} 
            hideSelectColumn={!canDeletePerson.granted}
          />
        </Layout.Content>
      </Layout>
    </div>
  )
}

export default PersonsPage;
