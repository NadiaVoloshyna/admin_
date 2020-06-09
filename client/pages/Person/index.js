import React, { useState } from 'react'
import _unescape from 'lodash/unescape';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import Head from 'next/head';
import Error from 'next/error';
import Layout from 'shared/components/layout';

import PersonApi from 'pages/Person/api';
import UsersApi from 'shared/api/users';

import PersonActions from 'pages/Person/components/actions';
import PersonName from 'pages/Person/components/name';
import PersonPortrait from 'pages/Person/components/portrait';
import PersonProfession from 'pages/Person/components/profession';
import ProfessionSection from 'pages/Person/components/professionSection';
import PersonYears from 'pages/Person/components/years';
import StatusDropdown from 'pages/Person/components/statusDropdown';
import DocumentAction from 'pages/Person/components/documentAction';
import PersonUserList from 'pages/Person/components/usersList';

const PersonPage = (props) => {
  const [ person, setPerson ] = useState(props.person);
  const [ usersForAssignment, setUsersForAssignment ] = useState([]);
  const [ disableActions, setActionsDisabled ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false); 

  if (props.errorCode) {
    return <Error statusCode={errorCode} />; 
  }

  const { user, professions } = props;
  const { name, portrait, rootAssetId, professions: personsProfessions, status, biography, permissions } = person;

  const canEdit = (
    user.isAdmin ||
    user.isSuper ||
    user.isAuthor && permissions.some(item => item.user._id === user._id )
  );

  /**
   * Updates the person
   * @param {Object} values Person fields to update
   */
  const onPersonSave = (values) => {
    setIsLoading(true);

    PersonApi.update(person._id, values)
      .then(response => {
        // TODO: probably we need to show some kind of toast with update confirmation
        console.log(response)
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }

  /**
   * Updates the status of the document
   * @param {String} newStatus New status of the document
   */
  const updateStatus = (newStatus) => {
    setIsLoading(true);
    
    PersonApi.updateStatus(person._id, status)
      .then(() => setPerson({ ...person, newStatus }))
      .catch(error => {
        // TODO: log error
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }

  /**
   * Assignes the user to be the author or reviewer for this post
   * @param {String} selectedUserId The ID if the user to be assigned either as author or the reviewer
   */
  const setPermission = (selectedUserId) => {
    setIsLoading(true);

    PersonApi.updatePermissions(person._id, selectedUserId)
      .then(response => response.json())
      .then(permissions => setPerson({
        ...person,
        permissions: [...person.permissions, ...permissions]
      }))
      .catch(error => {
        // TODO: handle error
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }

  /**
   * Gets the list of users by it's role
   * @param {String} role The role of the user (author or reviewer)
   */
  const getUsersForAssignment = (role) => {
    setIsLoading(true);

    UsersApi.getUsersByRole(role)
      .then(response => response.json())
      .then(users => {
        const filtered = users.filter(user => !permissions.find(item => item.user._id === user._id));
        setUsersForAssignment(filtered);
      })
      .catch(error => {
        // TODO: handle error
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  };

  const availableProfessions = () => {
    return props.professions.filter(prof => 
      personsProfessions.every(item => item.profession._id !== prof._id)
    );
  }
  
  return (
    <div>
      <Head>
        <title>Post</title>
        <link rel='icon' href='/favicon.ico' />
        <script src="https://media-library.cloudinary.com/global/all.js" defer></script>
      </Head>

      <Layout activePage="Person">
        <Form
          onSubmit={onPersonSave}
          mutators={{
            ...arrayMutators
          }}
          initialValues={{ 
            name, 
            portrait: _unescape(portrait).replace(/&#x2F;/g, '/'),
            professions: personsProfessions
          }}
          render={({
            form: {
              mutators: { push, pop }
            },
            handleSubmit, 
            form, 
            submitting, 
            pristine, 
            values 
          }) => {
            setActionsDisabled(submitting || pristine);

            return (
              <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <Layout.Navbar className="mb-3">
                  <div>Person</div>
                  <PersonActions disableActions={disableActions} />
                </Layout.Navbar>

                <Layout.Content className="py-3 pt-4" isLoading={isLoading} >
                  <div className="row">
                    <div className="col-9">
                      <PersonName canEdit={canEdit} />
                      { user.userRoleUp('admin') && 
                        <PersonUserList
                          onUsersGet={getUsersForAssignment}
                          users={permissions}
                          usersForAssignment={usersForAssignment}
                          userPermissions={user.permissions}
                          setPermission={setPermission}
                        />
                      }
                      <ProfessionSection
                        professions={professions}
                        rootFolder={{
                          _id: rootAssetId,
                          name,
                          type: 'folder'
                        }}
                      />
                    </div>
                    <div className="col-3">
                      <div className="mb-4 d-flex">
                        <StatusDropdown 
                          status={status} 
                          user={user}
                          updateStatus={updateStatus}
                        />
                        <DocumentAction 
                          documentId={biography.documentId} 
                          me={user}
                          permissions={permissions}
                        />
                      </div>
                      <PersonPortrait />
                      <PersonYears canEdit={canEdit} />
                      <PersonProfession 
                        professions={availableProfessions()}
                        onAdd={push}
                        onRemove={pop}
                      />
                    </div>
                  </div>
                </Layout.Content>
              </form>
          )}}
        />
      </Layout>
    </div>
  )
}

export default PersonPage;
