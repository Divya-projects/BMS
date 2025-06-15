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