import axios from 'axios';

const axiosPublic = axios.create({
    // baseURL: 'https://assignment-12-ashen.vercel.app'
    baseURL: 'http://localhost:5000'
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;