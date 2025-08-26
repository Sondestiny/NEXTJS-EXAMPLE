// Đây sẽ là file giả lập API sử dụng hook
"use client";
import { User } from "@/types/user.type";
import { AxiosError, AxiosPromise, AxiosRequestConfig } from "axios"
import { RefetchFunction, RefetchOptions, UseAxiosResult } from 'axios-hooks';
import { useCallback, useEffect, useState } from "react";
type MockupConfigType = {
    result?: any,
    manual?: boolean,
    refetchKey?: string,
    config?: AxiosRequestConfig
}
type MockAxiosResponse<T> = {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
};
function useAxiosMockup(
    {result,
    manual,
    refetchKey,
    config,
}: MockupConfigType) : UseAxiosResult {
    // khai báo 3 biến data, loading, error để mô phỏng ResponseValue
    const [data, setData] = useState<User[]>(result);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<AxiosError | null>(null);
    
    // Khai báo hàm refetch để mô phỏng RefetchFunction
    const refetch : RefetchFunction<Body, Response>  = useCallback(
        (
            configOrEvent?: AxiosRequestConfig<Body> | string | Event,
            options?: RefetchOptions
        ): AxiosPromise<Response> => {
            console.log('chạy refetch ')
            return new Promise((resolve)=> {
                setTimeout(()=> {
                    setData(result);
                    setLoading(false);
                    resolve({
                        // @ts-ignore: mock data nên không cần khớp hoàn toàn
                        data: result,
                        status: config?.method == "POST" ? 201 : 200,
                        statusText: '',
                        headers: {},
                        config
                    } as MockAxiosResponse<any>)
                }, 1000);
            })
        }, [result, config]
    );
    useEffect(()=> {
        if (!manual) {refetch()}
        
    }, [manual, refetchKey, refetch])
    return [{data, loading, error}, refetch , ()=> undefined]
}
export default useAxiosMockup;