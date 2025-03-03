import axios from 'axios';

const axiosInstancia = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'token-de-prueba'
  }
});

export default axiosInstancia;