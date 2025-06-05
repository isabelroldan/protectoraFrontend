import axios from "axios";
import { getToken } from "./LoginService";

const baseUrl = 'http://localhost:8000/api/solicitudes'
// const baseUrl = 'https://protectora-backend.onrender.com/api';

// Obtener todas las solicitudes
export const getSolicitudes = async (
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

    const res = await axios.get(`${baseUrl}/paginadas`, config);
    console.log(res.data); // Debug opcional
    return res.data;
};

// Obtener TODAS las solicitudes sin paginación (para el calendario)
export const getAllSolicitudes = async () => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    };
    // const res = await axios.get(`${baseUrl}/solicitudes`, config);
    const res = await axios.get('http://localhost:8000/api/solicitudes', config);
    return res.data;
};

// Obtener las solicitudes del usuario autenticado (para rol 'usuario')
export const getMisSolicitudes = async () => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    };

    // const res = await axios.get(`${baseUrl}/mis-solicitudes`, config);
    const res = await axios.get(`http://localhost:8000/api/mis-solicitudes`, config);
    console.log(res.data);
    return res.data;
};

// Obtener una solicitud específica por ID
export const getSolicitud = async (id: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }
    const res = await axios.get(`${baseUrl}/${id}`, config);
    console.log(res.data);

    return res.data
}

// Crear una nueva solicitud
export const createSolicitud = async (payload: any) => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }
    const res = await axios.post(baseUrl, payload, config);
    console.log(res.data);

    return res.data
}

// Actualizar una solicitud existente
export const updateSolicitud = async (id: string, payload: any) => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }
    const res = await axios.put(`${baseUrl}/${id}`, payload, config);
    console.log(res.data);

    return res.data
}

// Eliminar una solicitud
export const deleteSolicitud = async (id: string) => {
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
