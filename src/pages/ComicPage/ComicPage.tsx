import React from 'react';
import { useParams } from 'react-router';
import {
  FavButton,
  Image,
  Info,
  PageLink,
  Wrapper
} from '../../components/CommonPageStyles/styles';
import FavoriteService from '../../services/favorite';
import MarvelService from '../../services/marvel';
import { Item2, Result } from '../../services/types/marvel';
import { toastError } from '../../utils/toastError';

type ParamProps = { id?: string };

const ComicPage = () => {
  const [data, setData] = React.useState<Result>();
  const [characters, setCharacters] = React.useState<Item2[]>([]);
  const [favorites, setFavorites] = React.useState<string[]>([]);

  const { id } = useParams<ParamProps>();

  const isFavorite = React.useMemo(
    () => favorites.includes(`${data?.id}`),
    [data?.id, favorites]
  );

  React.useEffect(() => {
    if (id) {
      MarvelService.getComicById(parseInt(id))
        .then(({ data }) => {
          setData(data.data.results[0]);
          setCharacters(data.data.results[0].characters.items);
        })
        .catch(toastError);
    }
  }, [id]);

  const getFavorites = React.useCallback(() => {
    FavoriteService.getFavorites()
      .then(({ data }) => {
        setFavorites(
          (data as any[])
            .filter((data) => data.type === 'comic')
            .map((data) => data.marvelId)
        );
      })
      .catch(toastError);
  }, []);

  React.useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  const handleCreateFavorite = (id: string) => {
    FavoriteService.createFavorite(id, 'comic').catch(toastError);
  };
  const handleDeleteFavorite = (id: number) => {
    FavoriteService.deleteFavorite(id).catch(toastError);
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
        alt={data?.title}
      />
      <Info>
        <FavButton
          isFavorite={isFavorite}
          onClick={() => handleFavoriteToggle(isFavorite, data?.id || 0)}
        >
          {isFavorite ? 'remover' : 'favoritar'}
        </FavButton>
        <h1>{data?.title}</h1>
        <p>{data?.description}</p>
        <div>
          {characters.map((char) => (
            <div key={char.name}>
              <PageLink
                to={`/characters/${char.resourceURI.split('/').slice(-1)[0]}`}
              >
                {char.name}
              </PageLink>
            </div>
          ))}
        </div>
      </Info>
    </Wrapper>
  );
};

export default ComicPage;
