import { axiosInstance } from '@/config/axiosConfig';
import type { Dispatch } from 'redux';
import * as types from './actionType';

// #region Auth ----------------------------------------------------------------------------------------------

export const set_isAuthenticated = (dispatch: Dispatch, data: boolean) => {
  dispatch({
    type: types.IS_AUTHENTICATED,
    payload: data,
  });
};

// Regular Action Creator
export const login_user = async (data: any) => {
  try {
    const response = await axiosInstance.post(`auth/login`, data);
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const register_user = async (data: any) => {
  try {
    const response = await axiosInstance.post(`auth/register`, data);
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const refreshToken = async () => {
  try {
    const response = await axiosInstance.post(`auth/refresh-token`);
    return response;
  } catch (error: any) {
    return error?.response?.data;
  }
};

// #en




// #region Shops ----------------------------------------------------------------------------------------------
const set_shop_list = (data: any) => ({
  type: types.SHOP_LIST,
  payload: data,
});

export const load_shop_list = async (
  dispatch: Dispatch,
  params: object = {},
) => {
  try {
    const response = await axiosInstance.get(`shops`, { params });
    dispatch(set_shop_list(response?.data));
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

const set_shop_data = (data: any) => ({
  type: types.SHOP_DATA,
  payload: data,
});

export const load_shop_data = async (
  dispatch: Dispatch,
  shopId: string,
) => {
  try {
    const response = await axiosInstance.get(`shops/${shopId}`);
    dispatch(set_shop_data(response?.data));
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const create_shop = async (data: Record<string, unknown>) => {
  try {
    const response = await axiosInstance.post(`shops`, data);
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const update_shop = async (shopId: string, data: Record<string, unknown>) => {
  try {
    const response = await axiosInstance.put(`shops/${shopId}`, data);
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const delete_shop = async (shopId: string) => {
  try {
    const response = await axiosInstance.delete(`shops/${shopId}`);
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

//#endregion ----------------------------------------------------------------------------------------------


// #region Invoice ----------------------------------------------------------------------------------------------
const set_invoice_list = (data: any) => ({
  type: types.INVOICE_LIST,
  payload: data,
});

export const load_invoice_list = async (
  dispatch: Dispatch,
  params: object = {},
) => {
  try {
    const response = await axiosInstance.get(`invoices`, { params });
    dispatch(set_invoice_list(response?.data));
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

const set_invoice_data = (data: any) => ({
  type: types.INVOICE_DATA,
  payload: data,
});

export const load_invoice_data = async (
  dispatch: Dispatch,
  invoiceId: string,
) => {
  try {
    const response = await axiosInstance.get(`invoice/${invoiceId}`);
    dispatch(set_invoice_data(response?.data));
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const create_invoice = async (data: Record<string, unknown>) => {
  try {
    const response = await axiosInstance.post(`invoice`, data);
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const update_invoice = async (invoiceId: string, data: Record<string, unknown>) => {
  try {
    const response = await axiosInstance.put(`invoice/${invoiceId}`, data);
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const delete_invoice = async (invoiceId: string) => {
  try {
    const response = await axiosInstance.delete(`invoice/${invoiceId}`);
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

//#endregion ----------------------------------------------------------------------------------------------