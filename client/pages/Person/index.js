import React, { useState } from 'react';
import { shape } from 'prop-types';
import { Form } from 'react-final-form';
import { useAlert } from 'react-alert';
import arrayMutators from 'final-form-arrays';
import useErrorHandler from 'shared/hooks/useErrorHandler';
import Layout from 'shared/components/layout';
import { ERROR_MESSAGES, SUCCESS_MESSAGES, PAGE_NAMES } from 'shared/constants';
import { ProfessionType, Person } from 'shared/prop-types';
import { UserType } from 'common/prop-types/authorization/user';

import PersonApi from 'pages/Person/api';
import UsersApi from 'shared/api/users';

import Permissions from 'pages/Person/utils/permissions';

import PersonActions from 'pages/Person/components/actions';
import DocumentActions from 'pages/Person/components/documentActions';
import PersonName from 'pages/Person/components/name';
import PersonPortrait from 'pages/Person/components/portrait';
import PersonProfession from 'pages/Person/components/profession';
import ProfessionSection from 'pages/Person/components/professionSection';
import PersonYears from 'pages/Person/components/years';
import PersonUserList from 'pages/Person/components/usersList';
import HistoryDrawer from 'pages/Person/components/historyDrawer';

const PersonPage = (props) => {
  const handleError = useErrorHandler();
  const alert = useAlert();
  const [ person, setPerson ] = useState(props.person);
  const [ usersForAssignment, setUsersForAssignment ] = useState([]);
  const [ disableActions, setActionsDisabled ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ activities, setActivities ] = useState([]);
  const [ isHistoryDrawerOpen, setHistoryDrawerOpen ] = useState(false);

  const { user, professions } = props;

  const {
    name,
    portrait,
    rootAssetId,
    professions: personsProfessions,
    biography,
    born,
    died,
    drivePermissions,
  } = person;
  // TODO: move to Person page level
  const permissions = new Permissions(user, person);

  /**
   * Updates the person
   * @param {Object} values Person fields to update
   */
  const onPersonSave = (values, form) => {
    setIsLoading(true);

    // send only updated fields and fields name
    const changedFields = {};
    const { dirtyFields } = form.getState();

    Object.keys(values).forEach(key => {
      if (typeof dirtyFields[key] !== 'undefined' || key === 'name') {
        changedFields[key] = values[key];
      }
    });

    PersonApi.update(person._id, changedFields)
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
          status: newStatus,
        });
        alert.success(SUCCESS_MESSAGES.PERSON_STATUS_UPDATE);
      })
      .catch(error => handleError(error, ERROR_MESSAGES.PERSON_UPDATE_STATUS))
      .finally(() => setIsLoading(false));
  };

  /**
   * Assignes the user to be the author or reviewer for this post
   * @param {Array} selectedUsers The users to be assigned either as author or the reviewer
   */
  const setPermission = (selectedUsers) => {
    setIsLoading(true);

    const requests = selectedUsers.map(user => PersonApi.updatePermission(person._id, user._id));

    Promise.all(requests)
      .then((permissions) => {
        setPerson({
          ...person,
          drivePermissions: [
            ...person.drivePermissions,
            ...permissions.map(item => item.data),
          ],
        });
      })
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
        const filtered = users.filter(user => !drivePermissions.find(item => item.user._id === user._id));
        setUsersForAssignment(filtered);
      })
      .catch((error) => {
        handleError(error, ERROR_MESSAGES.PERSON_GET_USERS_FOR_ASSIGNMENT);
      })
      .finally(() => setIsLoading(false));
  };

  /**
   * Fetched this post's activity
   */
  const onHistoryGet = () => {
    setIsLoading(true);

    PersonApi.getActivities(person._id)
      .then(({ data }) => {
        setActivities(data);
        setHistoryDrawerOpen(true);
      })
      .catch(error => handleError(error, ERROR_MESSAGES.PERSON_GET_ACTIVITY))
      .finally(() => setIsLoading(false));
  };

  const availableProfessions = () => {
    return professions.filter(prof => (
      personsProfessions.every(item => item.profession._id !== prof._id)
    ));
  };

  return (
    <div>
      <Layout activePage={PAGE_NAMES.PERSON} user={user}>
        <Form
          onSubmit={onPersonSave}
          mutators={{
            ...arrayMutators,
            onProfessionRemove: ([id], state, { changeValue }) => {
              const mutator = (value) => value.filter(item => item.profession._id !== id);
              changeValue(state, 'professions', mutator);
            },
          }}
          initialValues={{
            name,
            portrait,
            professions: personsProfessions,
          }}
          render={({
            form: {
              mutators: { push, onProfessionRemove },
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
                      <PersonName canEdit={permissions.canEdit()} />

                      <PersonUserList
                        onUsersGet={getUsersForAssignment}
                        assignees={drivePermissions}
                        usersForAssignment={usersForAssignment}
                        user={user}
                        setPermission={setPermission}
                      />

                      <ProfessionSection
                        professions={professions}
                        rootFolder={{
                          _id: rootAssetId,
                          name,
                          type: 'folder',
                        }}
                      />
                    </div>
                    <div className="col-3">
                      <DocumentActions
                        permissions={permissions}
                        documentId={biography.documentId}
                        updateStatus={updateStatus}
                        onHistoryGet={onHistoryGet}
                      />
                      <PersonPortrait rootAssetId={rootAssetId} />
                      <PersonYears
                        canEdit={permissions.canEdit()}
                        born={born}
                        died={died}
                      />
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

      <HistoryDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={setHistoryDrawerOpen}
        activities={activities}
      />
    </div>
  );
};

PersonPage.propTypes = {
  person: shape(Person).isRequired,
  user: shape(UserType).isRequired,
  professions: shape(ProfessionType).isRequired,
};

export default PersonPage;
