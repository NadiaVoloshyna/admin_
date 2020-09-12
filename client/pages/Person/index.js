import React, { useState } from 'react';
import { shape } from 'prop-types';
import _unescape from 'lodash/unescape';
import { Form } from 'react-final-form';
import { useAlert } from 'react-alert';
import arrayMutators from 'final-form-arrays';
import Head from 'next/head';
import useErrorHandler from 'shared/hooks/useErrorHandler';
import Layout from 'shared/components/layout';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'shared/constants';
import { ProfessionType, Person } from 'shared/prop-types';
import { UserType } from 'common/prop-types/authorization/user';

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
  const handleError = useErrorHandler();
  const alert = useAlert();
  const [ person, setPerson ] = useState(props.person);
  const [ usersForAssignment, setUsersForAssignment ] = useState([]);
  const [ disableActions, setActionsDisabled ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);

  const { user, professions } = props;

  const {
    name,
    portrait,
    rootAssetId,
    professions: personsProfessions,
    status,
    biography,
    permissions: docPermissions
  } = person;

  const canEdit = user.updateAny('persons')
    || (user.updateOwn('persons') && docPermissions.some(item => item.user._id === user._id));

  /**
   * Updates the person
   * @param {Object} values Person fields to update
   */
  const onPersonSave = (values) => {
    setIsLoading(true);

    PersonApi.update(person._id, values)
      .then(() => alert.success(SUCCESS_MESSAGES.PERSON_SAVE))
      .catch(error => handleError(error, ERROR_MESSAGES.PERSON_SAVE))
      .finally(() => setIsLoading(false));
  };

  /**
   * Updates the status of the document
   * @param {String} newStatus New status of the document
   */
  const updateStatus = (newStatus) => {
    setIsLoading(true);

    PersonApi.updateStatus(person._id, newStatus)
      .then(() => {
        setPerson({
          ...person,
          status: newStatus
        });
        alert.success(SUCCESS_MESSAGES.PERSON_STATUS_UPDATE);
      })
      .catch(error => handleError(error, ERROR_MESSAGES.PERSON_UPDATE_STATUS))
      .finally(() => setIsLoading(false));
  };

  /**
   * Assignes the user to be the author or reviewer for this post
   * @param {String} selectedUserId The ID if the user to be assigned either as author or the reviewer
   */
  const setPermission = (selectedUserId) => {
    setIsLoading(true);

    PersonApi.updatePermissions(person._id, selectedUserId)
      .then(docPermissions => setPerson({
        ...person,
        permissions: [...person.permissions, ...docPermissions]
      }))
      .catch(error => handleError(error, ERROR_MESSAGES.PERSON_ASSIGN_USER))
      .finally(() => setIsLoading(false));
  };

  /**
   * Gets the list of users by it's role
   * @param {String} role The role of the user (author or reviewer)
   */
  const getUsersForAssignment = (role) => {
    setIsLoading(true);

    UsersApi.getUsersByRole(role)
      .then(({ data: users }) => {
        const filtered = users.filter(user => !docPermissions.find(item => item.user._id === user._id));
        setUsersForAssignment(filtered);
      })
      .catch((error) => {
        handleError(error, ERROR_MESSAGES.PERSON_GET_USERS_FOR_ASSIGNMENT);
      })
      .finally(() => setIsLoading(false));
  };

  const availableProfessions = () => {
    return professions.filter(prof => (
      personsProfessions.every(item => item.profession._id !== prof._id)
    ));
  };

  return (
    <div>
      <Head>
        <title>Post</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://media-library.cloudinary.com/global/all.js" defer />
      </Head>

      <Layout activePage="Person">
        <Form
          onSubmit={onPersonSave}
          mutators={{
            ...arrayMutators,
            onProfessionRemove: ([id], state, { changeValue }) => {
              const mutator = (value) => value.filter(item => item.profession._id !== id);
              changeValue(state, 'professions', mutator);
            }
          }}
          initialValues={{
            name,
            portrait: _unescape(portrait).replace(/&#x2F;/g, '/'),
            professions: personsProfessions
          }}
          render={({
            form: {
              mutators: { push, onProfessionRemove }
            },
            handleSubmit,
            form,
            submitting,
            pristine,
          }) => {
            setActionsDisabled(submitting || pristine);

            return (
              <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <Layout.Navbar className="mb-3">
                  <div>Person</div>
                  <PersonActions disableActions={disableActions} />
                </Layout.Navbar>

                <Layout.Content className="py-3 pt-4" isLoading={isLoading}>
                  <div className="row">
                    <div className="col-9">
                      <PersonName canEdit={canEdit} />

                      <PersonUserList
                        onUsersGet={getUsersForAssignment}
                        users={docPermissions}
                        usersForAssignment={usersForAssignment}
                        user={user}
                        setPermission={setPermission}
                      />

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
                          user={user}
                        />
                      </div>
                      <PersonPortrait />
                      <PersonYears canEdit={canEdit} />
                      <PersonProfession
                        professions={availableProfessions()}
                        onAdd={push}
                        onRemove={onProfessionRemove}
                      />
                    </div>
                  </div>
                </Layout.Content>
              </form>
            );
          }}
        />
      </Layout>
    </div>
  );
};

PersonPage.propTypes = {
  person: shape(Person).isRequired,
  user: shape(UserType).isRequired,
  professions: shape(ProfessionType).isRequired
};

export default PersonPage;
