import axios from 'axios';

axios.create({
    baseURL:'loacalhost:8000',
    timeout:5000
})