import React from 'react';
import { useHistory } from 'react-router';
import { CharResult } from '../../services/types/marvel';
import { Button, Container, ItemTitle } from '../ItemCommons/styles';

type Props = {
  data: CharResult;
  isFavorite: boolean;
  onFavoriteClick: (isFavorite: boolean, id: number) => void;
};

const CharacterItem = ({ data, isFavorite, onFavoriteClick }: Props) => {
  const history = useHistory();
  return (
    <Container onClick={() => history.push(`/characters/${data.id}`)}>
      <img
        src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
        alt={data.name}
        height='100%'
      />
      <ItemTitle>{data.name}</ItemTitle>
      <Button
        isFavorite={isFavorite}
        onClick={() => onFavoriteClick(isFavorite, data.id)}
      >
        {isFavorite ? 'remover' : 'favoritar'}
      </Button>
    </Container>
  );
};

export default CharacterItem;
