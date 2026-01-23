import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL
const api = axios.create({
    baseURL:apiUrl,
    headers:{
        "Content-Type":"application/json",
    }
})

//Add Auth Bearer token if it exists

export const axoios = axios

api.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('mmtoken')

        if(token){
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }

)

export default api