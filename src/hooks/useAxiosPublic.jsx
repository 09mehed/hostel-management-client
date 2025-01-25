import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: 'https://assignment-12-5x4tzx4tg-foysals-projects-1932f31f.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;