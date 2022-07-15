import { DateTimePicker, Input, Select } from '../';
import { Form, Row, SubmitButton } from './styles';

import Cookies from 'js-cookie';
import axios from 'axios';
import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import { useRouter } from 'next/router';
import { useS3Upload } from 'next-s3-upload';
import { useState } from 'react';

const DropzoneComp = ({ fullname, id }) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [filename, setFilename] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState(new Date());
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  const token = Cookies.get('x_access_token');
  const router = useRouter();

  const types = [
    { value: 0, text: 'Documento' },
    { value: 1, text: 'Registro de Atendimento' },
  ];

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      belongsTo: id,
      filename,
      url,
      type,
      date,
    };

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${process.env.BACKEND_URI}/api/documento/upload`, postData, headers)
      .then((res) => {
        if (res.data.success === false) {
          toastr.error('Erro', res.data.error);
          return;
        }
        toastr.info('Feito!', 'Documento registrado com sucesso!');
        refreshData();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onChange = async (file) => {
    setFilename(file.name);

    const { url } = await uploadToS3(file);
    setUrl(url);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input readOnly type="text" label="Nome do paciente" value={fullname} />

      <Row>
        <FileInput onChange={onChange} />
        <button type="button" onClick={openFileDialog}>{`${
          filename ? filename : 'Upload file'
        }`}</button>

        <DateTimePicker
          valueFormat={{ day: 'numeric', month: 'numeric', year: 'numeric' }}
          value={date}
          label="Data do Documento"
          onChange={(value) => setDate(moment(value, 'dd/mm/yyyy'))}
          calendarProps={{ views: ['year', 'decade', 'century'] }}
        />
      </Row>

      <Select
        label="Tipo de Documento"
        placeholder="Selecione"
        id="Type"
        value={type}
        data={types}
        onChange={(e) => setType(e.target.value)}
      />

      <SubmitButton disabled={!url ? true : false} type="submit">{`${
        loading ? '...' : 'Enviar'
      }`}</SubmitButton>
    </Form>
  );
};

export default DropzoneComp;
