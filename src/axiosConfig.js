import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.origin = 'http://localhost:8080'
axios.defaults.withCredentials = true;
axios.defaults.responseType = 'json';
axios.defaults.requestType = 'json';

const token = localStorage.getItem('authToken');

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        }
      return Promise.reject(error.response);
    } else if (error.request) {
      return Promise.reject({ message: 'No response received from server' });
    } else {
      return Promise.reject({ message: 'Error: ' + error.message });
    }
  }
);

export default axios;
