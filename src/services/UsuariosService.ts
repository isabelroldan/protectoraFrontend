import axios from "axios";
import { getToken } from "./LoginService";

const baseUrl = 'http://localhost:8000/api/usuarios'

export const getUsuarios = async () => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }
    const res = await axios.get(baseUrl, config);
    console.log(res.data);

    return res.data
}

export const getUsuario = async (id: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }
    const res = await axios.get(`${baseUrl}/${id}`, config);
    console.log(res.data);

    return res.data
}

export const createUsuario = async (payload: any) => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }
    const res = await axios.post(baseUrl, payload, config);
    console.log(res.data);

    return res.data
}

export const updateUsuario = async (id: string, payload: any) => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }
    const res = await axios.put(`${baseUrl}/${id}`, payload, config);
    console.log(res.data);

    return res.data
}


export const deleteUsuario = async (id: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }
    const res = await axios.delete(`${baseUrl}/${id}`, config);
    console.log(res.data);

    return {
        data: res.data,
        id: id
    }
}
