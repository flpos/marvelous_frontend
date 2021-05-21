import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import {
  FavButton,
  Image,
  Info,
  Wrapper,
} from '../../components/CommonPageStyles/styles';
import FavoriteService from '../../services/favorite';
import MarvelService from '../../services/marvel';
import { CharItem, CharResult } from '../../services/types/marvel';

type ParamProps = { id?: string };

const CharacterPage = () => {
  const [data, setData] = React.useState<CharResult>();
  const [comics, setComics] = React.useState<CharItem[]>([]);
  const [favorites, setFavorites] = React.useState<string[]>([]);

  const { id } = useParams<ParamProps>();

  const isFavorite = React.useMemo(
    () => favorites.includes(`${data?.id}`),
    [data?.id, favorites]
  );

  const getFavorites = React.useCallback(() => {
    FavoriteService.getFavorites().then(({ data }) => {
      setFavorites(
        (data as any[])
          .filter((data) => data.type === 'character')
          .map((data) => data.marvelId)
      );
    });
  }, []);

  React.useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  React.useEffect(() => {
    if (id) {
      MarvelService.getCharacterById(parseInt(id)).then(({ data }) => {
        setData(data.data.results[0]);
        setComics(data.data.results[0].comics.items);
      });
    }
  }, [id]);

  const handleCreateFavorite = (id: string) => {
    FavoriteService.createFavorite(id, 'character');
  };
  const handleDeleteFavorite = (id: number) => {
    FavoriteService.deleteFavorite(id);
  };

  const handleFavoriteToggle = (isFavorite: boolean, id: number) => {
    if (isFavorite) {
      handleDeleteFavorite(id);
    } else {
      handleCreateFavorite(`${id}`);
    }
    getFavorites();
  };

  return (
    <Wrapper>
      <Image
        src={`${data?.thumbnail.path}.${data?.thumbnail.extension}`}
        alt={data?.name}
      />
      <Info>
        <FavButton
          isFavorite={isFavorite}
          onClick={() => handleFavoriteToggle(isFavorite, data?.id || 0)}
        >
          {isFavorite ? 'remover' : 'favoritar'}
        </FavButton>
        <h1>{data?.name}</h1>
        <p>{data?.description}</p>
        <div>
          {comics.map((comic) => (
            <div key={comic.name}>
              <Link to={`/comics/${comic.resourceURI.split('/').slice(-1)[0]}`}>
                {comic.name}
              </Link>
            </div>
          ))}
        </div>
      </Info>
    </Wrapper>
  );
};

export default CharacterPage;
