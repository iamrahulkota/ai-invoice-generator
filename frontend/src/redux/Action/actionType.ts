export type Action = {
    type: string;
    payload: Record<string, unknown>;
  };
  
  // authActions --------------------------------
  export const LOGIN = 'LOGIN';
  export const LOGOUT = 'LOGOUT';
  export const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
  
  export const USER_DATA = 'USER_DATA';
  
  export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
  export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';


  export const SHOP_LIST = 'SHOP_LIST';
  export const SHOP_DATA = 'SHOP_DATA';
  export const INVOICE_LIST = 'INVOICE_LIST';
  export const INVOICE_DATA = 'INVOICE_DATA';
