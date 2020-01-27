import React from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import Layout from 'shared/components/layout';
import CreateDropdown from 'shared/components/createDropdown';
import { actions } from 'pages/professions/actions';
import { withUser } from 'shared/components/withUser';
import { initialState } from 'pages/professions/reducers';
import ProfessionsList from 'pages/professions/components/professionsList';

const Professions = ({createProfession}) => {
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
          <ProfessionsList />
        </Layout.Content>
      </Layout>
    </div>
  )
}

Professions.getInitialProps = ({ ctx }) => {
  const { store } = ctx;

  store.dispatch(actions.professionsInitialState(initialState));
  store.dispatch(actions.getProfessions());
}

const mapDispatchToProps = {
  createProfession: actions.createProfession
};

export default connect(null, mapDispatchToProps)(
  withUser(Professions)
);
