import { createSlice } from '@reduxjs/toolkit'


const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        loginUser: (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload))
            return action.payload
        },
        logoutUser: () => {
            localStorage.removeItem("user");
            return null
        }
    }
});

export const { loginUser, logoutUser } = userSlice.actions

export default userSlice.reducer