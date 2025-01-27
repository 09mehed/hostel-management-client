import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: 'https://assignment-12-ashen.vercel.app'
    // baseURL: 'http://localhost:5000',
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const {logout} = useAuth()
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
            return config
        }
       
    }, function (err) {
        return Promise.reject(err)
    })

    axiosSecure.interceptors.response.use(function(response) {
        return response
    },async (error) => {
        const status = error.response?.status
        if(status === 401 || status === 403){
            await logout()
            navigate('/signIn')
        }
        return Promise.reject(error)
    })

    return axiosSecure
};

export default useAxiosSecure;