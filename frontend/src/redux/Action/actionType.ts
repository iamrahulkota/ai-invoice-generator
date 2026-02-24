export type Action = {
    type: string;
    payload: Record<string, unknown>;
  };
  
  // authActions --------------------------------
  export const LOGIN = 'LOGIN';
  export const LOGOUT = 'LOGOUT';
  export const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
  
  export const USER_DATA = 'USER_DATA';
  export const USER_LIST = 'USER_LIST';
  
  export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
  export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';


  export const SHOPS_LIST = 'SHOPS_LIST';
  export const SHOP_DATA = 'SHOP_DATA';
