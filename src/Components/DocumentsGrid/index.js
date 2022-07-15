import { BodyTable, BodyWrapper, HeaderTable, MainTable, Styles } from './styles';

import Cookies from 'js-cookie';
import { Delete } from '@material-ui/icons';
import Link from 'next/link';
import axios from 'axios';
import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import { useRouter } from 'next/router';

function GridComp({ rows, columns }) {
  const token = Cookies.get('x_access_token');
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleDelete = (id) => {
    const confirmOptions = {
      okText: 'Sim!',
      cancelText: 'Não!',
      onOk: () => executeDelete(),
      onCancel: () => '',
    };
    toastr.confirm('Deseja realmente excluir o documento?', confirmOptions);

    function executeDelete() {
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };
      axios
        .delete(`${process.env.BACKEND_URI}/api/documento/excluir/${id}`, headers)
        .then((res) => {
          console.log({ res: res.data });
          if (res.data.success === false) {
            toastr.error('Erro', res.data.error);
            return;
          }
          toastr.info('Feito!', res.data.message);
        })
        .finally(() => {
          refreshData();
        });
    }
  };

  return (
    <Styles>
      <MainTable>
        <thead>
          <tr>
            <td>
              <HeaderTable>
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th key={`column__${column.name}`}>{column.name}</th>
                    ))}
                  </tr>
                </thead>
              </HeaderTable>
            </td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <BodyWrapper>
                <BodyTable>
                  <tbody>
                    {rows.map((document) => {
                      return (
                        <tr key={`document__${document._id}`}>
                          <td>
                            <Link href={`${document.url}`}>
                              <a target="_blank" rel="noreferrer">
                                {document.filename}
                              </a>
                            </Link>
                          </td>
                          <td>{moment(document.date).format('DD/MM/YYYY')}</td>
                          <td>
                            <a
                              style={{ cursor: 'pointer', color: '#007bff' }}
                              onClick={() => handleDelete(document._id)}
                            >
                              <Delete />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </BodyTable>
              </BodyWrapper>
            </td>
          </tr>
        </tbody>
      </MainTable>
    </Styles>
  );
}

export default GridComp;
