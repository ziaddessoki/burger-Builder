import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burgerbuilder-8a307.firebaseio.com/'
})

export default instance;
