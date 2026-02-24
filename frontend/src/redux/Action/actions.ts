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

export const refreshToken = async () => {
  try {
    const response = await axiosInstance.post(`auth/refresh-token`);
    return response;
  } catch (error: any) {
    return error?.response?.data;
  }
};






const set_shops_list = (data: any) => ({
  type: types.SHOPS_LIST,
  payload: data,
});

export const load_shops_list = async (
  dispatch: Dispatch,
  params: object = {},
) => {
  try {
    const response = await axiosInstance.get(`shops`, { params });
    dispatch(set_shops_list(response?.data));
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

const set_shops_data = (data: any) => ({
  type: types.SHOP_DATA,
  payload: data,
});

export const load_shops_data = async (
  dispatch: Dispatch,
  shopId: string,
) => {
  try {
    const response = await axiosInstance.get(`shops/${shopId}`);
    dispatch(set_shops_data(response?.data));
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