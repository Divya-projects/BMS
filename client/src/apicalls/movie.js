import { axiosInstance } from '.'

//Register
export const addMovie = async (payload) => {
    try{
        const res = await axiosInstance.post('/api/movies/add-movie', payload)
        return res.data
    }
    catch(e){
        return e
    }
} 

//Login
export const getAllMovies = async () => {
    try{
        const res = await axiosInstance.get('/api/movies/get-all-movies')
        console.log('get all movies from api calls')
        return res.data
    }
    catch(e){
        return e
    }
}

export const getMovieById = async (movieId) => {
    try{
        const res = await axiosInstance.get(`/api/movies/get-movie/${movieId}`)
        console.log('get movie by id api call')
        return res.data
    }
    catch(e){
        return e
    }
}

//Get current user
export const updateMovie = async (movieId, payload) => {
    try{
        console.log('update movieee', movieId)
        const res = await axiosInstance.put(`/api/movies/update-movie/${movieId}`, payload)
        return res.data
    }
    catch(e){
        console.log('err from update movie at client', e)
        return e
    }
} 

export const deleteMovie = async (movieId) => {
    try{
        const res = await axiosInstance.delete(`/api/movies/delete-movie/${movieId}`)
        return res.data
    }
    catch(e){
        console.log('err from delete movie at client', e)
        return e
    }
} 