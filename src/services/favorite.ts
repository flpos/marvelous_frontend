import axios, { AxiosInstance } from 'axios';
import store from '../store';

const baseURL = process.env.REACT_APP_API;

class FavoriteService {
  private instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({ baseURL });
    this.instance.interceptors.request.use((req) => {
      const token = store.getState().auth.token;
      req.headers['Authorization'] = `Bearer ${token}`;
      return req;
    });
  }

  createFavorite(marvelId: string, type: 'comic' | 'character') {
    return this.instance.post('/favorite', { marvelId, type });
  }

  getFavorites() {
    return this.instance.get('/favorite');
  }

  getFavorite(id: number) {
    return this.instance.get(`/favorite/${id}`);
  }

  deleteFavorite(id: number) {
    return this.instance.delete(`/favorite/${id}`);
  }
}

export default new FavoriteService();
