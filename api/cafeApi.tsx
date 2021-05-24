import axios from "axios";

const cafeApi = axios.create({
    baseURL: 'http://192.168.1.78:8080/api'
});

// TODO: Aplicar middlaware antes de cada peticion

export default cafeApi;