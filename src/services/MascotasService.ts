import axios from "axios";

const baseUrl = 'http://localhost:8000/api/mascotas'

export const getMascotas = async () => {
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

export const getMascota = async (id: string) => {
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

export const createMascota = async (payload: any) => {
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

export const updateMascota = async (id: string, payload: any) => {
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


export const deleteMascota = async (id: string) => {
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

/* export const doObtenerMascotas = async (token: string) => {
    const config = {
        headers: {
            Authorization: Bearer ${token}
        }
    }
    const res = await axios.get(baseUrl+"/"+id, config);
    return res.data
} */