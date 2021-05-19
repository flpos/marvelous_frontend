import axios, { AxiosInstance } from 'axios';

const baseURL = process.env.REACT_APP_API;

class LoginService {
  private instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({ baseURL });
  }

  login(username: string, password: string) {
    return this.instance.post('/auth/login', { username, password });
  }

  signUp(username: string, password: string) {
    return this.instance.post('/auth/signUp', { username, password });
  }
}

export default new LoginService();
