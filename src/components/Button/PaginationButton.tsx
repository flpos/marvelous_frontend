import styled from 'styled-components';

const PaginationButton = styled.button`
  min-width: 80px;
  font-size: 80px;

  border: none;
  outline: none;
  background-color: #101010;
  color: #505050;
  :hover {
    background-color: #202020;
  }
  :disabled {
    cursor: not-allowed;
  }
`;

export default PaginationButton;
