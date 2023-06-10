import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://todo-list-kn-203.herokuapp.com/api/test/';
const TODO_API_BASE_URL = "https://todo-list-kn-203.herokuapp.com/api";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getAllUsers() {
    return axios.get(TODO_API_BASE_URL + '/all-users');
  }
}

export default new UserService();