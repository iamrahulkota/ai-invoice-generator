import { axiosInstance } from '@/components/config/axiosInstance';
import { Dispatch } from 'redux';
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
    const response = await axiosInstance.post(`backend/user/login`, data);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const refreshToken = async () => {
  try {
    const response = await axiosInstance.post(`backend/user/refresh_token`);
    return response;
  } catch (error) {
    return error?.response?.data;
  }
};