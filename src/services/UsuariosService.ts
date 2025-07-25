import axios from "axios";
import { getToken } from "./LoginService";

const baseUrl = 'http://localhost:8000/api/usuarios'
// const baseUrl = 'https://protectora-backend.onrender.com/api';


// Obtener todos los usuarios
/* export const getUsuarios = async () => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }
    const res = await axios.get(baseUrl, config);
    console.log(res.data);

    return res.data
} */

export const getUsuarios = async (
    page = 1,
    perPage = 5,
    search = ''
) => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        params: {
            page,
            perPage,
            ...(search ? { search } : {})
        }
    };

    const res = await axios.get(`${baseUrl}/paginados`, config);
    console.log(res.data); // Debug opcional
    return res.data;
};

// Obtener TODAS las solicitudes sin paginación (para el calendario)
export const getAllUsuarios = async () => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    };
    const res = await axios.get(`${baseUrl}/usuarios`, config);
    // const res = await axios.get('http://localhost:8000/api/usuarios', config);
    return res.data;
};


// Obtener un usuario específico por ID
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

// Crear un nuevo usuario
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

// Actualizar un usuario existente
export const updateUsuario = async (id: string, payload: any) => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }
    const res = await axios.put(`${baseUrl}/${id}`, payload, config);
    console.log("Service usuarios", res.data);

    return res.data
}

// Eliminar un usuario
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
