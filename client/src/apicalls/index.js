import axios from 'axios'

const token = localStorage.getItem("token")

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8082",
    headers: {
        withCredentials: true,
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
    },
})

//dynamically inject token in all further API calls/req before leaving client to reach server
axiosInstance.interceptors.request.use(
    function(config){
        const token = localStorage.getItem('token')
        if (token){
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config
    },
    function(err){
        return Promise.reject(err)
    }
)