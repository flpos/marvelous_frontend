import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import md5 from 'md5';
import { CharacterRoot, ComicRoot } from './types/marvel';

const MarvelApi = process.env.REACT_APP_MARVEL_API;
const publicKey = process.env.REACT_APP_MARVEL_API_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_MARVEL_API_PRIVATE_KEY;

export class MarvelService {
  private instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({ baseURL: MarvelApi });
    this.instance.interceptors.request.use((config) => {
      const timestamp = new Date().getMilliseconds();

      if (!config.params) config.params = {};

      config.params['ts'] = timestamp;
      config.params['hash'] = md5(`${timestamp}${privateKey}${publicKey}`);
      config.params['apikey'] = publicKey;

      return config;
    });
  }

  getSpidey = () => {
    return this.instance.get('characters', {
      params: {
        nameStartsWith: 'spider-man',
      },
    });
  };

  getComicsWithNameStartingWith(name: string, limit: number, offset: number) {
    return this.instance.get<ComicRoot>('comics', {
      params: {
        titleStartsWith: name,
        limit,
        offset,
      },
    });
  }
  getCharactersWithNameStartingWith(
    name: string,
    limit: number,
    offset: number
  ) {
    return this.instance.get<CharacterRoot>('characters', {
      params: {
        nameStartsWith: name,
        limit,
        offset,
      },
    });
  }

  getComicById(id: number) {
    return this.instance.get<ComicRoot>(`comics/${id}`);
  }
  getCharacterById(id: number) {
    return this.instance.get<CharacterRoot>(`characters/${id}`);
  }

  genericGet<T>(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.get(url, options);
  }
}

export default new MarvelService();
