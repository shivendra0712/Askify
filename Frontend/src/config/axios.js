import axios from "axios";
// https://askify-backend-l0fk.onrender.com

const axiosInstance = axios.create({
    baseURL: "https://askify-backend-l0fk.onrender.com",
    withCredentials: true,
  
})


export default axiosInstance;