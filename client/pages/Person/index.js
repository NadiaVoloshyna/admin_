import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import _unescape from 'lodash/unescape';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import Head from 'next/head';
import Error from 'next/error';
import Layout from 'shared/components/layout';

import PersonActions from 'pages/Person/components/actions';
import PersonName from 'pages/Person/components/name';
import DuplicateModal from 'pages/Person/components/duplicateModal';
import PersonPortrait from 'pages/Person/components/portrait';
import PersonProfession from 'pages/Person/components/profession';
import ProfessionSection from 'pages/Person/components/professionSection';
import PersonYears from 'pages/Person/components/years';
import StatusDropdown from 'pages/Person/components/statusDropdown';
import DocumentAction from 'pages/Person/components/documentAction';
import PersonUserList from 'pages/Person/components/usersList';

const PersonPage = (props) => {
  const { person } = useSelector(state => state.person);
  const [ disableActions, setActionsDisabled ] = useState(false);
  const { updatePerson, professions, errorCode, user } = props;

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  const { name, portrait, rootAssetId, professions: personsProfessions, status, biography, permissions } = person;
  const canEdit = (
    user.isAdmin ||
    user.isSuper ||
    user.isAuthor && permissions.some(item => item.user._id === user._id )
  );

  const onSubmit = (values) => {
    updatePerson({
      id: person._id,
      ...values
    });
  }

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
        <Layout.Navbar className="mb-3">
          <div>Person</div>
          <PersonActions disableActions={disableActions} />
        </Layout.Navbar>

        <Layout.Content className="py-3 pt-4">
          <Form
            onSubmit={onSubmit}
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
                  <div className="row">
                    <div className="col-9">
                      <PersonName canEdit={canEdit} />
                      { user.userRoleUp('admin') && 
                        <PersonUserList 
                          permissions={permissions}
                          userPermissions={user.permissions}
                          personId={person._id}
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
                          personId={person._id}
                          user={user}
                          permissions={permissions}
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
                </form>
            )}}
          />
        </Layout.Content>
      </Layout>

      <DuplicateModal />
    </div>
  )
}

export default PersonPage;
