import axios from 'axios';

export const axiosWithAuth = () =>{
    return axios.create({
        baseURL: 'https://replate-bw.herokuapp.com/',

        headers: {
            Authorization: sessionStorage.getItem('token')
        }
    })
}