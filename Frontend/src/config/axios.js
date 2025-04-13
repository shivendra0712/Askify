import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "https://askify-backend-l0fk.onrender.com",
    withCredentials: true,
  
})


export default axiosInstance;