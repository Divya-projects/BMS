import { axiosInstance } from '.'

export const addTheatre = async (payload) => {
    try{
        const res = await axiosInstance.post('/api/theatres/add-theatre', payload)
        return res.data
    }
    catch(e){
        return e
    }
} 

export const getAllTheatres = async () => {
    try{
        const res = await axiosInstance.get('/api/theatres/get-all-theatres')
        console.log('get all theatre from api calls')
        return res.data
    }
    catch(e){
        return e
    }
} 

export const getAllTheatresByOwner = async (theatreId) => {
    try{
        const res = await axiosInstance.get(`/api/theatres/get-all-theatres/${theatreId}`)
        console.log('get all theatre from api calls')
        return res.data
    }
    catch(e){
        return e
    }
} 

//update theatre
export const updateTheatre = async (theatreId, payload) => {
    try{
        console.log('update theatre', theatreId)
        const res = await axiosInstance.put(`/api/theatres/update-theatre/${theatreId}`, payload)
        return res.data
    }
    catch(e){
        console.log('err from update theatre at client', e)
        return e
    }
} 

export const deleteTheatre = async (theatreId) => {
    try{
        const res = await axiosInstance.delete(`/api/theatres/delete-theatre/${theatreId}`)
        return res.data
    }
    catch(e){
        console.log('err from delete theatre at client', e)
        return e
    }
} 