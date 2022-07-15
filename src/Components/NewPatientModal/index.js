import {
  ButtonsWrapper,
  FormRow,
  FormTitle,
  RegisterForm,
  ResetButton,
  SubmitButton,
} from '../../styles/pacientes';
import { DateTimePicker, Input, Select } from '../';

import Cookies from 'js-cookie';
import axios from 'axios';
import moment from 'moment';
import { toastr } from 'react-redux-toastr';

function RegisterPatient({
  close,
  loading,
  setLoading,
  fullname,
  setFullName,
  birthday,
  setBirthday,
  telephone,
  setTelephone,
  telephoneFormated,
  setTelephoneFormated,
  address,
  setAddress,
  email,
  setEmail,
  serviceType,
  setServiceType,
  healthPlanName,
  setPlanName,
  healthPlanValue,
  setPlanValue,
  status,
  setStatus,
}) {
  const token = Cookies.get('x_access_token');

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    const postData = {
      fullname,
      birthday,
      telephone,
      address,
      email,
      serviceType,
      healthPlanName,
      healthPlanValue,
      status,
    };

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${process.env.BACKEND_URI}/api/pacientes`, postData, headers)
      .then((res) => {
        if (res.data.success === false) {
          toastr.error('Erro', res.data.error);
          return;
        }
        resetFields();
        toastr.info('Feito!', 'Paciente cadastrado com sucesso!');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const phoneMask = (telephone) => {
    const num = telephone.replace(/\D/g, '');
    let tel = '';
    if (num.length > 0) {
      tel = `(${num.substring(0, 2)})${num.substring(2, 7)}-${num.substring(7, 11)}`;
    }

    setTelephone(num);
    setTelephoneFormated(tel);
  };

  const resetFields = () => {
    setFullName('');
    setTelephone('');
    setTelephoneFormated('');
    setAddress('');
    setEmail('');
    setServiceType('');
    setPlanName('');
    setPlanValue('');
    setStatus('');
  };

  const serviceTypes = [
    { value: '0', text: 'Particular' },
    { value: '1', text: 'Plano de Saúde' },
    { value: '2', text: 'Supervisão' },
  ];

  const statuses = [
    { value: '0', text: 'Inativo' },
    { value: '1', text: 'Ativo' },
  ];

  return (
    <>
      <RegisterForm onSubmit={submitHandler}>
        <div>
          <FormTitle>Cadastrar Paciente</FormTitle>
        </div>
        <Input
          type="text"
          label="Nome Completo"
          value={fullname}
          id="name"
          onChange={(e) => setFullName(e.target.value)}
        />

        <FormRow>
          <DateTimePicker
            valueFormat={{ day: 'numeric', month: 'numeric', year: 'numeric' }}
            value={birthday}
            label="Data de Nascimento"
            onChange={(value) => setBirthday(moment(value, 'dd/mm/yyyy'))}
            calendarProps={{ views: ['year', 'decade', 'century'] }}
          />
          <Input
            type="tel"
            label="Celular"
            id="telephone"
            value={telephoneFormated}
            placeholder="(xx)xxxxx-xxxx"
            onChange={(e) => phoneMask(e.target.value)}
          />
        </FormRow>

        <Input
          type="text"
          label="Endereço"
          value={address}
          id="address"
          onChange={(e) => setAddress(e.target.value)}
        />

        <FormRow>
          <Input
            type="email"
            value={email}
            label="Email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Select
            label="Tipo de Serviço"
            placeholder="Selecione"
            id="serviceType"
            value={serviceType}
            data={serviceTypes}
            onChange={(e) => setServiceType(e.target.value)}
          />
        </FormRow>

        {serviceType == 1 && (
          <FormRow>
            <Input
              type="text"
              value={healthPlanName}
              label="Nome do plano"
              id="healthPlanName"
              onChange={(e) => setPlanName(e.target.value)}
            />

            <Input
              type="text"
              value={healthPlanValue}
              label="Valor do repasse"
              id="healthPlanValue"
              onChange={(e) => setPlanValue(e.target.value)}
            />
          </FormRow>
        )}
        <FormRow>
          <Select
            label="Status"
            value={status}
            id="status"
            placeholder="Selecione"
            data={statuses}
            onChange={(e) => setStatus(e.target.value)}
          />
        </FormRow>

        <ButtonsWrapper>
          <SubmitButton type="submit">{`${loading ? '...' : 'Cadastrar'}`}</SubmitButton>
          <ResetButton type="reset" onClick={() => resetFields()}>
            Limpar
          </ResetButton>
          <ResetButton onClick={close}>Fechar</ResetButton>
        </ButtonsWrapper>
      </RegisterForm>
    </>
  );
}

export default RegisterPatient;
