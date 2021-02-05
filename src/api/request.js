import axios from 'axios';

const service = axios.create({
    baseURL:'/api',
    timeout:5000,
})

// service.interceptors.request.use(
//     config => {
//         console.log('fig',config);
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

service.interceptors.response.use(
    response => {
        const res = response.data;
        console.log('response',response)
        return res;
    },
    error => {
        return Promise.reject(error);
    }
);

export default service;