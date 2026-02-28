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

  user_data: {},


  // shopsActions
  shop_list: [],
  shop_list_meta: {},
  shop_data: {},

  // invoiceActions
  invoice_list: [],
  invoice_list_meta: {},
  invoice_data: {},

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
    case types.USER_DATA:
      return {
        ...state,
        user_data: action.payload,
      }
    case types.SHOP_LIST:
      return {
        ...state,
        shop_list: action.payload.data,
        shop_list_meta: action.payload.meta,
      };
    case types.SHOP_DATA:
      return {
        ...state,
        shop_data: action.payload.data,
      };
    case types.INVOICE_LIST:
      return {
        ...state,
        invoice_list: action.payload.data,
        invoice_list_meta: action.payload.meta,
      };
    case types.INVOICE_DATA:
      return {
        ...state,
        invoice_data: action.payload.data,
      };
    default:
      return state;
  }
};
export default DataReducers;
