import { LRUCache } from 'lru-cache';
export const axiosLRUCache = new LRUCache<string, string>({
    max: 500,
    ttl: 1000*60
}) 