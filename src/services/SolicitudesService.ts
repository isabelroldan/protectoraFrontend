import axios from "axios";

const baseUrl = 'http://localhost:8000/api/solicitudes'

export const getSolicitudes = async () => {
    const config = {
        headers: {
            // Authorization: `Bearer ${token}`
            Authorization: `Bearer 1pj7RLwkZjHzO8Hh2OpXi4RtgJYNG55dsqrVLzBo591f966c`
        }
    }
    const res = await axios.get(baseUrl, config);
    console.log(res.data);

    return res.data
}

export const getSolicitud = async (id: string) => {
    const config = {
        headers: {
            // Authorization: `Bearer ${token}`
            Authorization: `Bearer 1pj7RLwkZjHzO8Hh2OpXi4RtgJYNG55dsqrVLzBo591f966c`
        }
    }
    const res = await axios.get(`${baseUrl}/${id}`, config);
    console.log(res.data);

    return res.data
}

export const createSolicitud = async (payload: any) => {
    const config = {
        headers: {
            // Authorization: `Bearer ${token}`
            Authorization: `Bearer 1pj7RLwkZjHzO8Hh2OpXi4RtgJYNG55dsqrVLzBo591f966c`
        }
    }
    const res = await axios.post(baseUrl, payload, config);
    console.log(res.data);

    return res.data
}

export const updateSolicitud = async (id: string, payload: any) => {
    const config = {
        headers: {
            // Authorization: `Bearer ${token}`
            Authorization: `Bearer 1pj7RLwkZjHzO8Hh2OpXi4RtgJYNG55dsqrVLzBo591f966c`
        }
    }
    const res = await axios.put(`${baseUrl}/${id}`, payload, config);
    console.log(res.data);

    return res.data
}

export const deleteSolicitud = async (id: string) => {
    const config = {
        headers: {
            // Authorization: `Bearer ${token}`
            Authorization: `Bearer 1pj7RLwkZjHzO8Hh2OpXi4RtgJYNG55dsqrVLzBo591f966c`
        }
    }
    const res = await axios.delete(`${baseUrl}/${id}`, config);
    console.log(res.data);

    return {
        data: res.data,
        id: id
    }
}
