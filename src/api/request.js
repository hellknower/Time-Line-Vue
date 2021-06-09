import axios from 'axios';

const service = axios.create({
    baseURL:'/api',
    timeout:5000,
})

service.interceptors.request.use(
    config => {
        // console.log('config',config);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        // console.log('response',response)
        if(response.status === 200){
            const res = response.data;
            return res;
        }
    },
    error => {
        return Promise.reject(error);
    }
);

export default service;