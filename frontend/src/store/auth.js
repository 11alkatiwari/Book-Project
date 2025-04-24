import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{ isLoggedIn: false, role:"user"},
    reducers:{
        login(state,action){
            state.isLoggedIn = true;
            state.role = action.payload.role;
            },
        logged(state){
            state.isLoggedIn = false;
            state.role = "user";
            },
        changeRole(state, action){
            state.role = action.payload.role;
            },
        },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
