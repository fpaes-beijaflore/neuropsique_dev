import styled from 'styled-components';

export const Row = styled.div`
  width: 100%;
  display: grid;
  grid-template-areas: 'a a';
  grid-gap: 20px;
  grid-template-columns: auto auto;
  text-align: left;
`;

export const Form = styled.form`
  width: 500px;
  height: auto;
  margin: 20px;
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

  :disabled {
    background: #f3f3f3;
    color: #b3b3b3;
    box-shadow: none;
    border: 1px solid #f3f3f3;
  }
`;
