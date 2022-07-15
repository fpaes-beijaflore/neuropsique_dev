import * as cookie from 'cookie';

import { Grid, Navbar, Tab } from '../../src/Components/';
import { PatientsContainer, TabsWrapper } from '../../src/styles/pacientes';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { toastr } from 'react-redux-toastr';

function Pacientes({ patients }) {
  const [searchFilter, setSearchFilter] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    if (patients.success === false) {
      toastr.error('Erro', `${patients.data.error}`);
    }
  }, [patients]);

  const columns = [
    { key: 'fullname', name: 'Nome' },
    { key: 'status', name: 'Status' },
    { key: '', name: '' },
  ];

  const tabs = Array.isArray(patients)
    ? [
        {
          title: 'Particular',
          Comp: (
            <Grid
              setSearchFilter={setSearchFilter}
              setFilterStatus={setFilterStatus}
              rows={patients
                .filter(
                  (patient) =>
                    patient.serviceType === 0 &&
                    patient.fullname.toLowerCase().includes(searchFilter.toLowerCase())
                )
                .filter((patient) => {
                  switch (filterStatus) {
                    case '0':
                      return patient.status == 0;
                      break;

                    case '1':
                      return patient.status == 1;
                      break;

                    default:
                      return patient;
                  }
                })}
              columns={columns}
            />
          ),
        },
        {
          title: 'Plano de Saúde',
          Comp: (
            <Grid
              setSearchFilter={setSearchFilter}
              setFilterStatus={setFilterStatus}
              rows={patients
                .filter(
                  (patient) =>
                    patient.serviceType === 1 &&
                    patient.fullname.toLowerCase().includes(searchFilter.toLowerCase())
                )
                .filter((patient) => {
                  switch (filterStatus) {
                    case '0':
                      return patient.status == 0;
                      break;

                    case '1':
                      return patient.status == 1;
                      break;

                    default:
                      return patient;
                  }
                })}
              columns={columns}
            />
          ),
        },
        {
          title: 'Supervisão',
          Comp: (
            <Grid
              setSearchFilter={setSearchFilter}
              setFilterStatus={setFilterStatus}
              rows={patients
                .filter(
                  (patient) =>
                    patient.serviceType === 2 &&
                    patient.fullname.toLowerCase().includes(searchFilter.toLowerCase())
                )
                .filter((patient) => {
                  switch (filterStatus) {
                    case '0':
                      return patient.status == 0;
                      break;

                    case '1':
                      return patient.status == 1;
                      break;

                    default:
                      return patient;
                  }
                })}
              columns={columns}
            />
          ),
        },
      ]
    : [];

  return (
    <>
      <Navbar />
      <PatientsContainer>
        <TabsWrapper>
          <Tab tabList={tabs} />
        </TabsWrapper>
      </PatientsContainer>
    </>
  );
}

export default Pacientes;

export const getServerSideProps = async (context) => {
  const { x_access_token } = cookie.parse(context.req.headers.cookie);

  const patients = await axios
    .get(`${process.env.BACKEND_URI}/api/pacientes`, {
      headers: { authorization: `Bearer ${x_access_token}` },
    })
    .then((res) => {
      if (res.data) {
        return res.data;
      }

      throw new Error('Erro ao carregar os dados!');
    })
    .catch((err) => err);

  return {
    props: { patients },
  };
};
