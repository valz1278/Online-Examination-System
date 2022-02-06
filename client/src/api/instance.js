import axios from 'axios'
import Auth from '../modules/Auth'
const instance = axios.create({
    baseURL: process.env.SERVER_URL
})

/**
 * this is for axios interceptors in which every single request 
 * axios will use this function to check if authenticated 
 * if authenticated then use the token as bearer token for backend authorization
 */

instance.interceptors.request.use((config)=>{
    // check if user not authenticated
    if (!Auth.isUserAuthenticated())
        return config
    const {token} = Auth.getToken()
    config.headers["Authorization"] = `Bearer ${token}`
    return config
})

export default instance