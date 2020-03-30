import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:3333',
    baseURL: 'https://bethehero-backend-macario.herokuapp.com/',
});

export default api;