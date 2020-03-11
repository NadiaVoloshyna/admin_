import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import _unescape from 'lodash/unescape';
import { withUser } from 'shared/components/withUser';
// import { withError } from 'shared/components/withError';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import Head from 'next/head';
import Error from 'next/error';
import Layout from 'shared/components/layout';

import PersonActions from 'pages/person/components/actions';
import PersonName from 'pages/person/components/name';
import DuplicateModal from 'pages/person/components/duplicateModal';
import PersonPortrait from 'pages/person/components/portrait';
import PersonProfession from 'pages/person/components/profession';
import ProfessionSection from 'pages/person/components/professionSection';
import PersonYears from 'pages/person/components/years';
import StatusDropdown from 'pages/person/components/statusDropdown';
import DocumentAction from 'pages/person/components/documentAction';
import PersonUserList from 'pages/person/components/usersList';

import PersonAPI from 'pages/person/api';
import ProfessionsAPI from 'pages/professions/api';
import { actions as pageActions } from 'pages/person/actions';

const Person = (props) => {
  const { person } = useSelector(state => state.person);
  const [ disableActions, setActionsDisabled ] = useState(false);
  const { updatePerson, professions, errorCode, user } = props;

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  const { name, portrait, rootAssetId, professions: personsProfessions, status, biography, permissions } = person;

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
                      <PersonName />
                      { user.userRoleUp('admin') && 
                        <PersonUserList 
                          permissions={permissions} 
                          personId={person._id}
                          documentId={biography.documentId}
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
                      <PersonYears />
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

Person.getInitialProps = async ({ ctx }) => {
  const { query, store, isServer } = ctx;
  let person = {};
  let professions = {};
  
  if (isServer) {
    const personReq      = PersonAPI.getPerson(query.id);
    const professionsReq = ProfessionsAPI.getAllProfessions();
    const personRes      = await personReq;
    const professionsRes = await professionsReq;

    if (personRes.status !== 200) return { errorCode: personRes.status };
    if (professionsRes.status !== 200) return { errorCode: professionsRes.status };

    person         = await personRes.json();
    professions    = await professionsRes.json();

    store.dispatch(pageActions.getPersonSuccess(person));
  };

  return {
    person,
    professions: professions.professions
  }
}

const mapDispatchToProps = {
  updatePerson: pageActions.updatePerson
};

export default connect(null, mapDispatchToProps)(
  withUser(Person)
);
