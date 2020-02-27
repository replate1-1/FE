import axios from 'axios';

export const axiosWithAuth = () =>{
    return axios.create({
        baseURL: 'temp',

        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}