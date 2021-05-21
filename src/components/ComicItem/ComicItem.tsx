import React from 'react';
import { useHistory } from 'react-router';
import { Result } from '../../services/types/marvel';
import { Button, Container, ItemTitle } from '../ItemCommons/styles';

type Props = {
  data: Result;
  isFavorite: boolean;
  onFavoriteClick: (isFavorite: boolean, id: number) => void;
};

const ComicItem = ({ data, isFavorite, onFavoriteClick }: Props) => {
  const history = useHistory();
  return (
    <Container onClick={() => history.push(`/comics/${data.id}`)}>
      <img
        src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
        alt={data.title}
        height='100%'
      />
      <ItemTitle>{data.title}</ItemTitle>
      <Button
        isFavorite={isFavorite}
        onClick={() => onFavoriteClick(isFavorite, data.id)}
      >
        {isFavorite ? 'remover' : 'Favoritar'}
      </Button>
    </Container>
  );
};

export default ComicItem;
