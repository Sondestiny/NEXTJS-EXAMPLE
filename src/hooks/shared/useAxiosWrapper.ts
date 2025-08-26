'use client'
import { AxiosRequestConfig } from 'axios';
import { Options} from 'axios-hooks';
import { AppConfig } from '../../_configs/app.config';
import useAxiosMockup from './useAxiosMockup';
type WrapperOptions = Options & {
  mockResult?: any; // dữ liệu mock trả về khi bật mockup
};
function useAxiosWrapper<TResponse>(
  config: AxiosRequestConfig | string, // gồm có method, url, params
  options?: WrapperOptions & { mockData?: TResponse } // nạp mockUsers ở đây
) {
    // nếu dặt enableApiMockup là true thì gọi api ảo lấy dự liệu truyền từ mock
    const mockResult = useAxiosMockup({
        result: options?.mockData,
        manual: options?.manual || false,
        refetchKey: JSON.stringify(config),
        config: typeof config === 'string' ? { url: config } : config,
      });
    if (!AppConfig.enableApiMockup) {
      return mockResult;
    }
    return [];
    
}

export default useAxiosWrapper;

