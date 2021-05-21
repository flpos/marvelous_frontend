import styled from 'styled-components';
import DefaultButton from '../Button';

export const ItemTitle = styled.p`
  position: absolute;
  transform: translate(0%, -75%) rotate(-90deg);
  white-space: nowrap;
  color: white;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  opacity: 0;

  transition: opacity 0.2s;
`;

type ButtonProps = { isFavorite: boolean };
export const Button = styled(DefaultButton)<ButtonProps>`
  opacity: ${({ isFavorite }) => (isFavorite ? 1 : 0)};
  position: absolute;
  bottom: 0px;
`;

export const Container = styled.div`
  position: relative;
  margin: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-grow: 1;
  :hover {
    ${ItemTitle}, ${Button} {
      opacity: 1;
    }
  }
`;
