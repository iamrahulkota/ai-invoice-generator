import * as types from '../Action/actionType';
import { jwtDecode } from 'jwt-decode';

const getUserFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const decodedToken: any = jwtDecode(token);
    return {
      ...decodedToken,
      userType: decodedToken?.roles?.code,
    };
  } catch (error) {
    console.warn('Failed to decode JWT token:', error);
    return null;
  }
};

export const initialState: any = {

  // authActions
  loggedIn: false,
  user: getUserFromToken(),
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  userId: null,

};

const DataReducers = (state: any = initialState, action: types.Action) => {
  // console.log("action", action.type, action.payload);
  switch (action.type) {
    case 'RESET_STATE':
      return initialState;
    case types.IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case 'TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'USER':
      return {
        ...state,
        user: action.payload,
      };
    case types.LOGIN:
      // #region Auth
      return {
        ...state,
        loggedIn: action.payload.token && action.payload.userId && true,
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case types.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        token: null,
        userId: null,
      };
    default:
      return state;
  }
};
export default DataReducers;
