import { UPDATE_PROFILE, GET_PROFILE, AUTH_ERROR } from '../types.js';

const initialState = {
  profile: null,
  loading: true,
  error: null,
};

export default function profileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}