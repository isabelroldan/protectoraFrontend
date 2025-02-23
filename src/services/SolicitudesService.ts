import axios from "axios";

const baseUrl = 'http://localhost:8000/api/solicitudes'

export const getSolicitudes = async () => {
    const config = {
        headers: {
            // Authorization: `Bearer ${token}`
            Authorization: `Bearer Kkahff2ixmms6n2eODGQVWVqgg1ZZXUAb04WL0Yk394b9885`
        }
    }
    const res = await axios.get(baseUrl, config);
    console.log(res.data);

    return res.data
}