import axios from 'axios';
import store from '../configureStore';

// import store from '@store';

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
