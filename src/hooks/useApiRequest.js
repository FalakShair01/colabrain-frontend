import useSWR from 'swr';

const fetcher = (url, token) =>
    fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then((res) => res.json());

const useApiRequest = (path, method = 'GET', token = false) => {
    const url = process.env.REACT_APP_BASE_URL + path;

    const { data, error, isLoading: loading, mutate } = useSWR(null, (url, token) => fetcher(url, token));

    const requestEndpoint = async (requestData) => {
        const options = {
            method,
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(requestData)
        };

        if (!!token) {
            options.headers['x-auth-token'] = `${token}`;
        }

        const response = await fetch(url, options);
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || responseData?.error?.message || 'Something went wrong!');
        }

        mutate(responseData); // Update the data in the cache

        return responseData;
    };

    return { data, error, loading, requestEndpoint };
};

export default useApiRequest;
