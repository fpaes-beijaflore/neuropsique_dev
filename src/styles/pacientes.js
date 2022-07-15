import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Header = styled.div`
  width: 80%;
  height: auto;
  display: block;
  margin: 40px auto;
`;

export const Row = styled.div`
  width: 100%;
  display: grid;
  grid-template-areas: 'a a';
  grid-gap: 20px;
  grid-template-columns: 50% 50%;
  text-align: left;

  div {
    display: flex;
    align-items: center;

    label {
      margin-bottom: 0;
    }
  }
`;

export const Input = styled.input`
  background: none;
  border: none;
  min-width: 440px;
  :focus {
    outline: none;
  }
`;

export const PatientsContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;

  .nav {
    max-width: 500px;
  }

  .tab-content {
    max-width: 500px;
  }
`;

export const TabsWrapper = styled.div`
  padding-top: 100px;
`;

export const FormRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-areas: 'a a';
  grid-gap: 20px;
  grid-template-columns: 50%;
  text-align: left;
`;

export const RegisterForm = styled.form`
  width: 600px;
  height: auto;
  margin: 0 auto;
`;

export const FormTitle = styled.h3`
  text-align: center;
`;

export const SubmitButton = styled.button`
  width: 120px;
  height: 40px;
  background: none;
  border: 1px solid #00f;
  border-radius: 4px;
  color: #00f;
  box-shadow: 0 0 4px black;
  margin-right: 20px;
  transition: 0.3s;
  font-weight: bold;

  :hover {
    background: #00f;
    color: #fff;
    box-shadow: 0 0 10px #000;
  }
`;

export const ResetButton = styled.button`
  width: 120px;
  height: 40px;
  background: none;
  border: 1px solid #f00;
  border-radius: 4px;
  color: #f00;
  box-shadow: 0 0 4px black;
  transition: 0.3s;
  font-weight: bold;

  :hover {
    background: #f00;
    color: #fff;
    box-shadow: 0 0 10px #000;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
