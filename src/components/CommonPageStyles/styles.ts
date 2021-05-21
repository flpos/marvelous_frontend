import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../ItemCommons/styles';

export const Wrapper = styled.div`
  color: lightgray;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Image = styled.img`
  height: calc(100vh - 42px);
  position: absolute;
  right: 50%;
  @media (max-width: 600px) {
    position: static;
    right: unset;
  }
`;

export const Info = styled.section`
  padding: 24px;
  position: absolute;
  left: 50%;
  right: 0px;
  min-height: calc(100vh - 42px);
  background-color: #303030;

  @media (max-width: 600px) {
    position: static;
    left: unset;
    right: unset;
    min-height: unset;
  }
`;

export const FavButton = styled(Button)`
  background-color: white;
  opacity: 1;
  position: static;
  float: right;
`;

export const PageLink = styled(Link)`
  &,
  &:visited {
    padding: 5px 10px;
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  &:hover {
    color: red;
  }
`;
