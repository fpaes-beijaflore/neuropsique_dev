import styled from 'styled-components';

export const Styles = styled.div`
  padding: 1rem 0;
`;

export const FilterWrapper = styled.div`
  display: grid;
  grid-template-areas: 'a a a';
  grid-template-columns: 260px 80px 159px;

  input,
  select {
    width: 100%;
    outline: none;
  }

  small {
    text-align: center;
  }
`;

export const MainTable = styled.table`
  width: 500px;
  border-spacing: 0;
  border-collapse: collapse;
`;

export const HeaderTable = styled.table`
  padding: 10px;
  border-collapse: collapse;
  max-width: 500px;

  tr {
    display: grid;
    grid-template-areas: 'a a a';
    grid-template-columns: 260px 80px 159px;

    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }

  th {
    border: 1px solid black;
    text-align: center;
    width: auto;

    :nth-child(2) {
      border-left: 0;
      border-right: 0;
    }
  }
`;

export const BodyWrapper = styled.div`
  width: 520px;
  height: auto;
  max-height: 500px;
  overflow: auto;
`;

export const BodyTable = styled.table`
  padding: 10px;
  border-collapse: collapse;
  max-width: 500px;

  tr {
    display: grid;
    grid-template-areas: 'a a a';
    grid-template-columns: 260px 80px 159px;

    :nth-child(2n) {
      background-color: #f3f3f3;
    }

    :last-child {
      td {
        border-bottom: 1px solid black;
      }
    }
  }

  td {
    text-align: center;
    width: auto;
    margin: 0;
    padding: 0.5rem;
    border-top: 1px solid black;
    border-right: 1px solid black;

    :first-child {
      border-left: 1px solid black;
      text-align: left;
    }

    :nth-child(2) {
      border-right: 0;
      border-left: 0;
    }

    :last-child {
      border-right: 1px solid black;
      border-left: 1px solid black;
    }
  }

  .paciente__inativo {
    color: red;
  }

  .paciente__ativo {
    color: green;
  }
`;
