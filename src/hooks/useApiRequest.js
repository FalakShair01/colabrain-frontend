import useSWR from 'swr';

const fetcher = (url, token) =>
    fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => res.json());

const useApiRequest = (path, method = 'GET', token = false) => {
    let url = process.env.REACT_APP_BASE_URL + path;

    const { data, error, isLoading: loading, mutate } = useSWR(null, (url, token) => fetcher(url, token));

    const requestEndpoint = async (requestData, params) => {
        const options = {
            method,
            headers: {}
        };

        if (!!process.env.REACT_APP_TOKEN) {
            options.headers['Authorization'] = `Bearer ${process.env.REACT_APP_TOKEN}`;
        }

        if (requestData) {
            options.body = JSON.stringify(requestData);
            options.header['Content-Type'] = 'application/json';
        }

        if (params) {
            url = `${url}${params}/`;
        }

        const response = await fetch(url, options);
        let responseData = {};

        if (method !== 'DELETE') {
            responseData = await response.json();
        }

        if (!response.ok) {
            throw new Error(responseData.message || responseData?.error?.message || 'Something went wrong!');
        }

        return responseData;
    };

    return { data, error, loading, requestEndpoint };
};

export default useApiRequest;
