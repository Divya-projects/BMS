import { axiosInstance } from ".";

export const addShow = async (payload) => {
    try{
       const res = await axiosInstance.post('/api/shows/add-show', payload)
        return res.data 
    } catch(e) {
        return e.message
    }
}

export const updateShow = async (showId, payload) => {
    try{
       const res = await axiosInstance.put(`/api/shows/update-show/${showId}`, payload)
        return res.data
    } catch(e) {
        return e.message
    }
}

export const deleteShow = async (showId) => {
    try{
       const res = await axiosInstance.delete(`/api/shows/delete-show/${showId}`)
        return res.data 
    } catch(e) {
        return e.message
    }
}

export const getShowsByTheatre = async (theatreId) => {
    try{
       const res = await axiosInstance.get(`/api/shows/get-all-shows-by-theatre/${theatreId}`)
        return res.data 
    } catch(e) {
        return e.message
    }
}

export const getAllTheatresByMovie = async (movieId, date) => {
    try{
       const res = await axiosInstance.get(`/api/shows/get-all-theatres-by-movie/${movieId}/${date}`)
        return res.data 
    } catch(e) {
        return e.message
    }
}

export const getShowById = async (showId) => {
    try{
       const res = await axiosInstance.get(`/api/shows/get-show/${showId}`)
        return res.data 
    } catch(e) {
        return e.message
    }
}