import axios, { AxiosInstance } from 'axios';
import store from '../store';

const baseURL = process.env.REACT_APP_API;

export class UserService {
  private instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({ baseURL });
    this.instance.interceptors.request.use((req) => {
      const token = store.getState().auth.token;
      req.headers['Authorization'] = `Bearer ${token}`;
      return req;
    });
  }

  getUser() {
    return this.instance.get('/user/token');
  }

  updateUser(id: number, password: string) {
    return this.instance.patch(`/user/${id}`, { password });
  }
}

export default new UserService();
