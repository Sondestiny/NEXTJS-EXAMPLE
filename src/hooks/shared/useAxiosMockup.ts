// Đây sẽ là file giả lập API sử dụng hook

import { AxiosError, AxiosRequestConfig } from "axios"
import { RefetchOptions, UseAxiosResult } from 'axios-hooks';
import { useCallback, useEffect, useState } from "react";
type MockupConfigType = {
    result?: any,
    manual?: boolean,
    refetchkey?: string,
    config?: AxiosRequestConfig
}

function useAxiosMockup(
    {result,
    manual = false,
    refetchkey = '',
    config,
}: MockupConfigType) : UseAxiosResult {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AxiosError | null> (null);

    const refetch = useCallback(
        (
            config1?: AxiosRequestConfig | undefined,
            options?: RefetchOptions | undefined
        ): AxiosPromise => {
            return new Promise((resolve)=> {
                setLoading(true);
                setError(null);
                setData(undefined);
                setTimeout(()=> {
                    setLoading(false);
                    setData(result);
                    resolve({
                        data: result || {},
                        status: config?.method == "POST" ? 201 : 200,
                        statusText: '',
                        headers: {},
                        config: {},
                    })
                }, Math.random() * 3 * 1000);
            })
        }, [result, config?.method]
    );

    useEffect( ()=> {
        if (!manual) {refetch()}
    }, [manual, refetchkey]);

    return [{data, loading, error}, refetch , ()=> undefined]
}
export default useAxiosMockup;