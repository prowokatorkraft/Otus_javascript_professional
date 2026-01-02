import { useState, useEffect } from 'react';

type UseApiOptions = RequestInit;

type UseApiResult<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
};

function useApi<T>(url: string, options: UseApiOptions = {}): UseApiResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(url, options)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data: T) => {
                setData(data);
            })
            .catch((err: Error) => {
                setError(err.message);
            }).finally(() => {
                setLoading(false);
            });
    }, [url, options]);

    return { data, loading, error };
}

export default useApi;
