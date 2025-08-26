import { AppConfig } from '@/_configs/app.config';
import axios, { AxiosInstance } from 'axios';
import { axiosLRUCache } from './LruCache';
import { configure, makeUseAxios } from 'axios-hooks';
import { setupCache } from 'axios-cache-interceptor';
// khai báo axiosClient
export let axiosClient:AxiosInstance = axios.create({
  baseURL: AppConfig.apiBase || "http://localhost:5000",
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10s
});
// tích hợp axiosClient với cache
axiosClient = setupCache(axiosClient, {
  ttl: 1000 * 60 * 5, // cache 5 phút
});

axiosClient.interceptors.request.use(
    async (request) => {
        const token = {
            accessToken: 'my-access-token',
            refreshToken: 'my-refresh-token'
        }
        if (token?.accessToken) {
            request.headers.Authorization = `Bearer ${token?.accessToken}`
        }
        return request
    },
    (error) => Promise.reject(error)
)
axios.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export const useAxiosClient = makeUseAxios({
  axios: axiosClient
});;

