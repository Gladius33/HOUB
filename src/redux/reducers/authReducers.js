import { 
  REGISTER_SUCCESS, 
  REGISTER_FAIL, 
  LOGIN_SUCCESS, 
  LOGIN_FAIL, 
  LOGOUT, 
  AUTH_ERROR 
} from '../types.js';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null, // Ajout de l'état d'erreur
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        error: null, // Réinitialise les erreurs en cas de succès
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: payload, // Enregistre les erreurs retournées
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: null, // Réinitialise les erreurs après déconnexion
      };
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: payload, // Enregistre les erreurs d'authentification
      };
    default:
      return state;
  }
}
