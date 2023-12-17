import axios from 'axios';

import store from '@store';

axios.interceptors.request.use((reqConfig) => {
  const state = store.getState();
  const { token, tokenMerchant } = state.client;
  if (token) {
    reqConfig.headers.Authorization = `Bearer ${token}`;
  }
  if (tokenMerchant) {
    reqConfig.headers.Authorization = `Bearer ${tokenMerchant}`;
  }
  return reqConfig;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

const request = (options) => axios(options);

export default request;
// import axios from 'axios';
// // import Cookies from 'js-cookie';
// import store from '@store';
// import { refreshTokenApi } from '@domain/api';
// import { setToken } from '@containers/Client/actions';

// axios.interceptors.request.use(async (reqConfig) => {
//   const state = store.getState();
//   const { token } = state.client;

//   if (token) {
//     reqConfig.headers.Authorization = `Bearer ${token}`;
//   }

//   return reqConfig;
// });

// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     Promise.reject(error);

//     // const { dispatch } = store;
//     // const originalRequest = error.config;
//     // if (error.response?.status === 401) {
//     //   const response = await refreshTokenApi();

//     //   if (response?.data.accessToken) {
//     //     dispatch(setToken(response?.data?.accessToken));
//     //     originalRequest.headers.Authorization = `Bearer ${response?.data?.accessToken}`;
//     //     return axios.request(originalRequest);
//     //   }
//     // }
//     // if (error.response?.status === 403) {
//     //   window.location.href('/');
//     // }

//     // if (error.response?.status === 406) {
//     //   console.log({ error });
//     // }
//     // Promise.reject(error);
//   }
// );

// const request = (options) => axios(options);

// export default request;
