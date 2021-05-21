import { Link as OLink } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Background = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)),
    url('http://i.annihil.us/u/prod/marvel/i/mg/6/40/531771a14fcf6.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  filter: blur(12px);

  z-index: -1;
`;

export const Link = styled(OLink)`
  &,
  &:visited {
    text-decoration: none;
    color: red;
    font-weight: bold;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 42px;
  background-color: #fffa;

  > * {
    margin-bottom: 18px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
`;
