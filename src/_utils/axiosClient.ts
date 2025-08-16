import { AppConfig } from '@/_configs/app.config';
import axios from 'axios';
import { axiosLRUCache } from './LruCache';
import { configure } from 'axios-hooks';
const axiosClient = axios.create({
  baseURL: AppConfig.apiBase,
  headers: {
    'Content-Type': 'application/json',
  },
});
const cache = axiosLRUCache;
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

configure({axios, cache});