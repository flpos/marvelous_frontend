import axios, { AxiosInstance } from 'axios';
import md5 from 'md5';

const MarvelApi = process.env.REACT_APP_MARVEL_API;
const publicKey = process.env.REACT_APP_MARVEL_API_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_MARVEL_API_PRIVATE_KEY;

export class MarvelService {
  private instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({ baseURL: MarvelApi });
    this.instance.interceptors.request.use((config) => {
      const timestamp = new Date().getMilliseconds();
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
}

export default new MarvelService();
