import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'Users',
    initialState: { user: null },
    reducers: {
        SetUser: (state, action) => {
            console.log("hello from setuser", action.payload)
            state.user = action.payload
        }
    }
})

export const { SetUser } = userSlice.actions
export default userSlice.reducer