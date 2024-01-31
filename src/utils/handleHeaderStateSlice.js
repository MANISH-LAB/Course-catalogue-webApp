import {createSlice} from "@reduxjs/toolkit";
const handleHeaderStateSlice=createSlice({
    name:"handleHeaderState",
    initialState:{
        loggedin:false,
        id:-1,
    },
    reducers:{
        updateLoggedinState:(state,action)=>{
            state.loggedin=action.payload;
        },
        updateUserID:(state,action)=>{
            state.id=action.payload;
        },
        
    }
})



export default handleHeaderStateSlice.reducer;
export const {updateLoggedinState ,updateUserID}= handleHeaderStateSlice.actions;