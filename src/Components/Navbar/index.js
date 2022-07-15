import { Container, Nav, Navbar } from 'react-bootstrap';

import Cookies from 'js-cookie';
import Link from 'next/link';
import Modal from 'react-modal';
import { NewPatientModal } from '../';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useState } from 'react';

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

function NavbarComp() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullname, setFullName] = useState('');
  const [birthday, setBirthday] = useState(moment(new Date(), 'dd/mm/yyyy'));
  const [telephone, setTelephone] = useState('');
  const [telephoneFormated, setTelephoneFormated] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [healthPlanName, setPlanName] = useState('');
  const [healthPlanValue, setPlanValue] = useState('');
  const [status, setStatus] = useState('');

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    refreshData();
  }

  const logout = () => {
    Cookies.remove('x_access_token');
    Cookies.remove('auth');

    router.push('/');
  };

  return (
    <>
      <Navbar bg="light" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} href="/pacientes">
            <a>Neuropsique</a>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={openModal}>Cadastrar Paciente</Nav.Link>
              <Nav.Link id="logout" onClick={() => logout()}>
                Sair
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Cadastrar Paciente"
      >
        <NewPatientModal
          close={closeModal}
          loading={loading}
          setLoading={setLoading}
          fullname={fullname}
          setFullName={setFullName}
          birthday={birthday}
          setBirthday={setBirthday}
          telephone={telephone}
          setTelephone={setTelephone}
          telephoneFormated={telephoneFormated}
          setTelephoneFormated={setTelephoneFormated}
          address={address}
          setAddress={setAddress}
          email={email}
          setEmail={setEmail}
          serviceType={serviceType}
          setServiceType={setServiceType}
          healthPlanName={healthPlanName}
          setPlanName={setPlanName}
          healthPlanValue={healthPlanValue}
          setPlanValue={setPlanValue}
          status={status}
          setStatus={setStatus}
        />
      </Modal>
    </>
  );
}

export default NavbarComp;
