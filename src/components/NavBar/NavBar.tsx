import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { logoutAction } from '../../store/auth/actions';
import Button from '../Button';

const Wrapper = styled.div<{ shrink: boolean }>`
  background-color: #202020;
  height: 42px;
  display: flex;
  justify-content: center;
  position: relative;

  > *:first-child,
  > *:last-child {
    position: absolute;
    height: 100%;
  }
  > *:first-child {
    left: 0px;
  }
  > *:last-child {
    right: 0px;
  }

  a,
  a:visited {
    padding: 5px 10px;
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  #menu {
    display: none;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    > *:first-child,
    > *:last-child {
      position: unset;
      display: flex;
      width: 100%;
      height: 42px;
    }
    a {
      height: 42px;
      min-height: 42px;
      flex: 1;
    }
    #menu {
      display: block;
      position: absolute;
      height: 42px;
      right: 0px;
      top: 0px;
    }
    height: unset;
    ${({ shrink }) =>
      shrink &&
      css`
        height: 42px;
        overflow: hidden;
      `}
  }
`;

const Link = styled(NavLink)`
  position: relative;
  &.active::after {
    content: '';
    border-bottom: 4px solid red;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
  }
`;

const NavBar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAction());
  };

  const [shrink, setShrink] = React.useState(false);

  return (
    <>
      <Wrapper shrink={shrink}>
        <Link to='/panel'>Usuário</Link>
        <Link to='/comics-search'>Quadrinhos</Link>
        <Link to='/' exact>
          Favoritos
        </Link>
        <Link to='/characters-search'>Personagens</Link>
        <Button id='menu' onClick={() => setShrink((s) => !s)}>
          Menu
        </Button>
        <Button onClick={handleLogout}>Sair</Button>
      </Wrapper>
    </>
  );
};

export default NavBar;
