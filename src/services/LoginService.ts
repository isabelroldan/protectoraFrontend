import axios from "axios";

const baseUrl = 'http://localhost:8000/api'
// const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';


// Función para realizar el login
export const doLogin = async (payload: any) => {
    // Realiza una petición POST al endpoint de login
    const res = await axios.post(`${baseUrl}/login`, payload);
    console.log(res.data);

    return res.data
}

// Función para realizar el logout
export const doLogout = async () => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }
    // Realiza una petición GET al endpoint de logout
    const res = await axios.get(`${baseUrl}/logout`, config);
    console.log(res.data);

    return res.data
}

// Función para obtener el token de la sesión
export const getToken = () => {
    return sessionStorage.getItem("token");
}