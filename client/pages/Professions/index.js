import React from 'react';
import Head from 'next/head';
import Layout from 'shared/components/layout';
import CreateDropdown from 'shared/components/createDropdown';
import ProfessionsList from 'pages/professions/components/professionsList';

const ProfessionsPage = ({createProfession}) => {
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

export default ProfessionsPage;
