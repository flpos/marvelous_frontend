import styled from 'styled-components';

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  height: calc(100vh - 102px);
  flex-grow: 1;
`;

export default ItemGrid;
