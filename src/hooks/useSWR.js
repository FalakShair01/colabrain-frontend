import useSWR, { mutate } from 'swr';

const fetcher = ([url, token]) =>
    fetch(url, {
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
        }
    }).then((res) => res.json());

const useSwrRequest = (path, token = false) => {
    const url = process.env.REACT_APP_BASE_URL + path;

    const { data, error, isLoading, isValidating } = useSWR([url, token], fetcher);

    return { data, error, isLoading, isValidating };
};

export default useSwrRequest;
