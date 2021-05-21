import React from 'react';
import Button, { PaginationButton } from '../../components/Button';
import CharacterItem from '../../components/CharacterItem';
import ComicItem from '../../components/ComicItem';
import DisplayArea from '../../components/DisplayArea';
import ItemGrid from '../../components/ItemGrid';
import FavoriteService from '../../services/favorite';
import MarvelService from '../../services/marvel';
import { CharResult, Result } from '../../services/types/marvel';

const limit = 6;

const Favorites = () => {
  const [section, setSection] =
    React.useState<'comic' | 'character'>('character');
  const [comicData, setComicData] = React.useState<Result[]>([]);
  const [characterData, setCharacterData] = React.useState<CharResult[]>([]);
  const [favoriteComics, setFavoriteComics] = React.useState<any>([]);
  const [favoriteCharacters, setFavoriteCharacters] = React.useState<any>([]);
  const [offset, setOffset] = React.useState(0);

  const total = React.useMemo(
    () => (section === 'character' ? characterData.length : comicData.length),
    [characterData.length, comicData.length, section]
  );

  const hasData = React.useMemo(() => {
    if (section === 'character') {
      return !!characterData.length;
    } else {
      return !!comicData.length;
    }
  }, [characterData.length, comicData.length, section]);

  const hasNext = React.useMemo(
    () => !(offset + limit >= total),
    [offset, total]
  );
  const hasPrev = React.useMemo(() => !(offset - limit < 0), [offset]);

  const getFavorites = React.useCallback(() => {
    FavoriteService.getFavorites().then(({ data }) => {
      setFavoriteComics(data.filter((d: any) => d.type === 'comic'));
      setFavoriteCharacters(data.filter((d: any) => d.type === 'character'));
    });
    setOffset(0);
  }, []);

  React.useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  React.useEffect(() => {
    const getData = async () => {
      let comicDataPromise: Promise<Result>[] = [],
        characterDataPromise: Promise<CharResult>[] = [];

      for (const comic of favoriteComics) {
        comicDataPromise.push(
          MarvelService.getComicById(comic.marvelId).then(
            ({ data }) => data.data.results[0]
          )
        );
      }
      for (const char of favoriteCharacters) {
        characterDataPromise.push(
          MarvelService.getCharacterById(char.marvelId).then(
            ({ data }) => data.data.results[0]
          )
        );
      }

      const comicsData = await Promise.all(comicDataPromise);
      const charactersData = await Promise.all(characterDataPromise);

      setCharacterData(charactersData);
      setComicData(comicsData);
    };
    getData();
  }, [favoriteCharacters, favoriteComics]);

  const handlePage = (type: 'next' | 'prev') => {
    let nextOffset: number;
    switch (type) {
      case 'next':
        if (hasNext) {
          nextOffset = offset + limit;
        } else {
          nextOffset = offset;
        }
        break;
      case 'prev':
        if (hasPrev) {
          nextOffset = offset - limit;
        } else {
          nextOffset = 0;
        }
        break;
    }
    setOffset(nextOffset);
  };

  const deleteFavorite = async (id: number) => {
    await FavoriteService.deleteFavorite(id);
    getFavorites();
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '10px',
        }}
      >
        <Button onClick={() => setSection('character')}>
          Visualizar Personagens
        </Button>
        <Button onClick={() => setSection('comic')}>
          Visualizar Quadrinhos
        </Button>
      </div>
      <DisplayArea>
        {hasData && (
          <PaginationButton
            disabled={!hasPrev}
            onClick={() => handlePage('prev')}
          >
            ‹
          </PaginationButton>
        )}
        <ItemGrid>
          {section === 'character' ? (
            <>
              {characterData.slice(offset, offset + limit).map((data) => (
                <CharacterItem
                  key={data.id}
                  data={data}
                  isFavorite={true}
                  onFavoriteClick={(_, id) => deleteFavorite(id)}
                />
              ))}
            </>
          ) : (
            <>
              {comicData.slice(offset, offset + limit).map((data) => (
                <ComicItem
                  key={data.id}
                  data={data}
                  isFavorite={true}
                  onFavoriteClick={(_, id) => deleteFavorite(id)}
                />
              ))}
            </>
          )}
        </ItemGrid>
        {hasData && (
          <PaginationButton
            disabled={!hasNext}
            onClick={() => handlePage('next')}
          >
            ›
          </PaginationButton>
        )}
      </DisplayArea>
    </>
  );
};

export default Favorites;
