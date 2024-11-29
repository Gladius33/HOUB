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
    // Vous pouvez ajouter d'autres configurations ici si nécessaire
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => response,
  error => {
    // Gestion des erreurs globales
    if (error.response) {
      // Le serveur a répondu avec un statut différent de 2xx
      if (error.response.status === 401) {
        // Déconnexion utilisateur ou autre action
      }
      return Promise.reject(error.response);
    } else if (error.request) {
      // La requête a été faite mais aucune réponse n'a été reçue
      return Promise.reject({ message: 'No response received from server' });
    } else {
      // Une autre erreur s'est produite lors de la configuration de la requête
      return Promise.reject({ message: 'Error: ' + error.message });
    }
  }
);

export default axios;
