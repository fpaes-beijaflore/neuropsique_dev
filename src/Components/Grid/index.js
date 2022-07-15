import { BodyTable, BodyWrapper, FilterWrapper, HeaderTable, MainTable, Styles } from './Styles';
import { EditTwoTone, VisibilityTwoTone } from '@material-ui/icons';
import { useEffect, useState } from 'react';

import { EditPatientModal } from '../';
import Link from 'next/link';
import Modal from 'react-modal';
import { useRouter } from 'next/router';

function GridComp({ rows, columns, setSearchFilter, setFilterStatus }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [patient, setPatient] = useState({});
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  function openModal(patient) {
    setPatient(patient);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    refreshData();
  }

  useEffect(() => {
    setSearchFilter('');
    setFilterStatus(2);
  }, []);

  return (
    <Styles>
      <FilterWrapper>
        <label htmlFor="filterName">
          <input
            id="filterName"
            name="filterName"
            type="text"
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Procurar"
          />
        </label>
        <label htmlFor="status">
          <select
            onChange={(e) => setFilterStatus(e.target.value)}
            defaultValue="2"
            name="status"
            id="status"
          >
            <option value="1">Ativo</option>
            <option value="0">Inativo</option>
            <option value="2">Todos</option>
          </select>
        </label>

        <small>total: {rows.length}</small>
      </FilterWrapper>
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
                    {rows
                      .sort(function (a, b) {
                        return a.fullname > b.fullname ? 1 : b.fullname > a.fullname ? -1 : 0;
                      })
                      .map((item) => (
                        <tr key={`patient__${item._id}`}>
                          <td>{item.fullname}</td>
                          <td
                            className={item.status === 0 ? 'paciente__inativo' : 'paciente__ativo'}
                          >
                            {item.status === 0 ? 'Inativo' : 'Ativo'}
                          </td>
                          <td>
                            <Link href={`/pacientes/${item._id}`}>
                              <a>
                                <VisibilityTwoTone />
                              </a>
                            </Link>
                            <Link href="">
                              <a onClick={() => openModal(item)}>
                                <EditTwoTone />
                              </a>
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </BodyTable>
              </BodyWrapper>
            </td>
          </tr>
        </tbody>
      </MainTable>

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Editar Paciente"
      >
        <EditPatientModal patient={patient} close={closeModal} />
      </Modal>
    </Styles>
  );
}

export default GridComp;
