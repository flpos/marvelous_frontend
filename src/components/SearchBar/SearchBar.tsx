import styled, { css } from 'styled-components';

type Props = {
  shrink?: boolean;
};

const shrinkState = css`
  position: relative;
  transform: translate(-50%, 0%);
  top: 0px;
  padding: 16px 64px 16px 96px;

  background-color: #505050;
`;

const SearchBar = styled.input<Props>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  background-color: red;
  border: none;
  padding: 32px 64px;

  font-family: Roboto;
  font-weight: bold;
  font-size: 24px;
  color: white;
  ::placeholder {
    color: white;
  }
  :focus {
    outline: none;
  }

  transition: top 0.3s;

  ${({ shrink }) => shrink && shrinkState}
`;

export default SearchBar;
