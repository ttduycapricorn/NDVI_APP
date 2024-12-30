import axios from 'axios';

export const AxiosConfig = () => {
    return axios.get('/').then((data) => data.json());
};
