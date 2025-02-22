import axios from "axios";

const baseUrl = 'http://localhost:8000/api/login'

export const doLogin = async (payload: any) => {

    const res = await axios.post(baseUrl, payload);
    console.log(res.data);
    
    return res.data
}