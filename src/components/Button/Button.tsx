import styled from 'styled-components';

const Button = styled.button`
  border: 1px solid black;
  padding: 12px;

  text-transform: uppercase;

  transition: all 0.4s;

  :hover {
    color: white;
    border: 1px solid white;
    background-color: red;
    font-weight: bold;
  }
`;

export default Button;
