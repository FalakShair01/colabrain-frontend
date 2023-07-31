import useSWR from 'swr';

const fetcher = ([url, token]) =>
    fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => res.json());

const useSwrRequest = (path, token = false) => {
    const url = process.env.REACT_APP_BASE_URL + path;

    const { data, error, isLoading, isValidating, mutate } = useSWR([url, token], fetcher);

    return { data, error, isLoading, isValidating, mutate };
};

export default useSwrRequest;
