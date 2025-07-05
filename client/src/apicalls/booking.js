import { axiosInstance } from '.'

//Register
export const makePayment = async (payload) => {
    try{
        console.log('payload being sent:', payload)
        const res = await axiosInstance.post('/api/bookings/make-payment', payload)
        console.log('from client side make payment')
        return res.data
    }
    catch(e){
        return e
    }
} 

export const bookShow = async (payload) => {
    try{
        const res = await axiosInstance.post('/api/bookings/book-show', payload)
        console.log('book show from api calls')
        return res.data
    }
    catch(e){
        return e
    }
}

export const getAllBookings = async () => {
    try{
        const res = await axiosInstance.get('/api/bookings/get-all-bookings')
        console.log('get all bookings api call')
        return res.data
    }
    catch(e){
        return e
    }
}