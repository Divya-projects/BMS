import { axiosInstance } from '.'

//Register
export const RegisterUser = async (payload) => {
    try{
        const res = await axiosInstance.post('/api/users/register', payload)
        return res.data
    }
    catch(e){
        return e
    }
} 

//Login
export const LoginUser = async (payload) => {
    try{
        console.log('payload for login client side', payload)
        const res = await axiosInstance.post('/api/users/login', payload)
        console.log('login from api calls')
        return res.data
    }
    catch(e){
        return e
    }
} 

//Get current user
export const GetCurrentUser = async () => {
    try{
        const res = await axiosInstance.get('/api/users/get-current-user')
        return res.data
    }
    catch(e){
        console.log('err from get curr user at server', e)
        return e
    }
} 

export const ForgetPassword = async (payload) => {
    try{
        const res = await axiosInstance.patch('/api/users/forget-password', payload)
        return res.data
    }
    catch(e){
        console.log('err from forget password in client', e)
        return e
    }
} 

export const ResetPassword = async (payload) => {
    try{
        const res = await axiosInstance.patch('/api/users/reset-password', payload)
        return res.data
    }
    catch(e){
        console.log('err from reset password in client', e.message)
        return e
    }
} 