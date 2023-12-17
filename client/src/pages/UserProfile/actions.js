import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_SUCCESS,
} from './constants';

export const getUserProfile = () => ({
  type: GET_USER_PROFILE,
});

export const getUserProfileSuccess = (data) => ({
  type: GET_USER_PROFILE_SUCCESS,
  data,
});

export const updateUserProfile = (data) => ({
  type: UPDATE_USER_PROFILE,
  data,
});

export const updateUserProfileSuccess = (data) => ({
  type: UPDATE_USER_PROFILE_SUCCESS,
  data,
});

export const updateUserPassword = (data) => ({
  type: UPDATE_USER_PASSWORD,
  data,
});

export const updateUserPasswordSuccess = (data) => ({
  type: UPDATE_USER_PASSWORD_SUCCESS,
  data,
});
