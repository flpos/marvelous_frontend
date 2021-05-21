import React from 'react';
import { PaginationButton } from '../../components/Button';
import ComicItem from '../../components/ComicItem';
import DisplayArea from '../../components/DisplayArea';
import ItemGrid from '../../components/ItemGrid';
import SearchBar from '../../components/SearchBar';
import ClearButton from '../../components/SearchBar/ClearButton';
import { default as FavoriteService } from '../../services/favorite';
import MarvelService from '../../services/marvel';
import { Result } from '../../services/types/marvel';

const limit = 6;

const ComicsSearch = () => {
  const [text, setText] = React.useState('');
  const [data, setData] = React.useState<Result[]>([]);
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const [offset, setOffset] = React.useState(0);
  const [total, setTotal] = React.useState(0);

  const hasData = React.useMemo(() => !!data.length, [data.length]);
  const hasNext = React.useMemo(
    () => !(offset + limit >= total),
    [offset, total]
  );
  const hasPrev = React.useMemo(() => !(offset - limit < 0), [offset]);

  const getFavorites = React.useCallback(() => {
    FavoriteService.getFavorites().then(({ data }) => {
      setFavorites(
        (data as any[])
          .filter((data) => data.type === 'comic')
          .map((data) => data.marvelId)
      );
    });
  }, []);

  React.useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  const getData = React.useCallback(
    (offset: number) => {
      MarvelService.getComicsWithNameStartingWith(text, limit, offset).then(
        ({ data }) => {
          setData(data.data.results);
          setTotal(data.data.total);
        }
      );
    },
    [text]
  );

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    if (!text) setData([]);
    setOffset(0);
    getData(0);
  };

  const handleCreateFavorite = (id: string) => {
    FavoriteService.createFavorite(id, 'comic');
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
    getData(nextOffset);
  };

  const resetSearch = () => {
    setData([]);
    setText('');
  };

  return (
    <>
      <form action='' onSubmit={handleSubmit}>
        <SearchBar
          type='text'
          value={text}
          onChange={({ target }) => setText(target.value)}
          placeholder='Digite o título do quadrinho'
          shrink={hasData}
        />
        {hasData && (
          <ClearButton type='button' onClick={resetSearch}>
            Limpar
          </ClearButton>
        )}
      </form>
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
          {data.map((data) => (
            <ComicItem
              key={data.id}
              data={data}
              isFavorite={favorites.includes(`${data.id}`)}
              onFavoriteClick={handleFavoriteToggle}
            />
          ))}
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

export default ComicsSearch;
