import * as cookie from 'cookie';

import { Container, Header, Input, Row } from '../../src/styles/pacientes';
import { DocumentsGrid, Navbar, Tab, UploadDocument } from '../../src/Components/';

import axios from 'axios';
import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import { useEffect } from 'react';

function ViewPatient({ patient }) {
  useEffect(() => {
    if (patient.success === false) {
      toastr.error('Erro', `${patient.data.error}`);
    }
  }, [patient]);

  const serviceType = (type) => {
    if (type === 0) {
      return 'Particular';
    } else if (type === 1) {
      return 'Plano de Saúde';
    } else {
      return 'Supervisão';
    }
  };

  const patientType = serviceType(patient.serviceType);

  const phoneMask = (phone) => {
    let tel = '';
    if (phone.length > 0) {
      tel = `(${phone.substring(0, 2)})${phone.substring(2, 7)}-${phone.substring(7, 11)}`;
    }

    return tel;
  };

  const columns = [
    { key: 'filename', name: 'Nome do Arquivo' },
    { key: 'date', name: 'Data' },
    { key: '', name: '' },
  ];

  const tabs = [
    {
      title: 'Documentos',
      Comp: (
        <DocumentsGrid
          rows={patient.documents.filter((document) => document.type === 0)}
          columns={columns}
        />
      ),
    },
    {
      title: 'Registro de Atendimentos',
      Comp: (
        <DocumentsGrid
          rows={patient.documents.filter((document) => document.type === 1)}
          columns={columns}
        />
      ),
    },
    {
      title: 'Upload',
      Comp: <UploadDocument fullname={patient.fullname} id={patient._id} />,
    },
  ];

  return (
    <>
      <Navbar />

      <Header>
        <Row>
          <div>
            <label htmlFor="name">Nome: </label>
            <Input id="name" readOnly value={patient.fullname} />
          </div>

          <div>
            <label htmlFor="age">Aniversário: </label>
            <Input id="age" readOnly value={moment(patient.birthday).format('DD/MM/YYYY')} />
          </div>
        </Row>

        <Row>
          <div>
            <label htmlFor="telephone">Telefone: </label>
            <Input id="telephone" readOnly value={phoneMask(patient.telephone)} />
          </div>

          <div>
            <label htmlFor="address">Endereço: </label>
            <Input id="address" readOnly value={patient.address} />
          </div>
        </Row>

        <Row>
          <div>
            <label htmlFor="email">Email: </label>
            <Input id="email" readOnly value={patient.email} />
          </div>

          <div>
            <label htmlFor="status">Status: </label>
            <Input id="status" readOnly value={patient.status === 0 ? 'Inativo' : 'Ativo'} />
          </div>
        </Row>

        <Row>
          <div>
            <label htmlFor="serviceType">Tipo de Atendimento: </label>
            <Input id="serviceType" readOnly value={patientType} />
          </div>

          {patient.serviceType === 1 && (
            <div>
              <label htmlFor="healthPlanName">Nome do Plano:</label>
              <Input id="healthPlanName" readOnly value={patient.healthPlanName} />
            </div>
          )}
        </Row>

        {patient.serviceType === 1 && (
          <Row>
            <div>
              <label htmlFor="healthPlanValue">Valor de Repasse:</label>
              <Input id="healthPlanValue" readOnly value={`R$${patient.healthPlanValue},00`} />
            </div>
          </Row>
        )}
      </Header>

      <Container>
        <Tab tabList={tabs} />
      </Container>
    </>
  );
}

export default ViewPatient;

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const { x_access_token } = cookie.parse(context.req.headers.cookie);

  const patient = await axios
    .get(`${process.env.BACKEND_URI}/api/pacientes/${id}`, {
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
    props: { patient },
  };
};
