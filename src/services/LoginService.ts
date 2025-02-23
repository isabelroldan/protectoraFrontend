import axios from "axios";

const baseUrl = 'http://localhost:8000/api'

export const doLogin = async (payload: any) => {

    const res = await axios.post(`${baseUrl}/login`, payload);
    console.log(res.data);

    return res.data
}

export const doLogout = async () => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }
    const res = await axios.get(`${baseUrl}/logout`, config);
    console.log(res.data);

    return res.data
}


export const getToken = () => {
    return sessionStorage.getItem("token");
}