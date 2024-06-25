import React from 'react';
import Layout from './layout';
import PatientPage from '../components/PatientPage';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <PatientPage />
    </Layout>
  );
};

export default HomePage;