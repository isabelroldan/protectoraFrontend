import axios from "axios";
import { getToken } from "./LoginService";

// const baseUrl = 'http://localhost:8000/api/mascotas'
const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';


/* export const getMascotas = async (page = 1, perPage = 5) => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        params: {
            page,
            perPage
        }
    }
    const res = await axios.get(`${baseUrl}/paginadas`, config);
    console.log(res.data);

    return res.data;
} */

    export const getMascotas = async (
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
            ...(search ? { search } : {}) // añade `search` solo si existe
        }
    };

    const res = await axios.get(`${baseUrl}/paginadas`, config);
    console.log(res.data);

    return res.data;
};

// Obtener TODAS las solicitudes sin paginación (para el calendario)
export const getAllMascotas = async () => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    };
    const res = await axios.get(`${baseUrl}/mascotas`, config);
    // const res = await axios.get('http://localhost:8000/api/mascotas', config);
    return res.data;
};




// Obtener una mascota específica por ID
export const getMascota = async (id: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }
    const res = await axios.get(`${baseUrl}/${id}`, config);
    console.log(res.data);

    return res.data
}

// Crear una nueva mascota
export const createMascota = async (payload: any) => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }
    const res = await axios.post(baseUrl, payload, config);
    console.log(res.data);

    return res.data
}

// Actualizar una mascota existente
export const updateMascota = async (id: string, payload: any) => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }
    const res = await axios.put(`${baseUrl}/${id}`, payload, config);
    console.log(res.data);

    return res.data
}

// Eliminar una mascota
export const deleteMascota = async (id: string) => {
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