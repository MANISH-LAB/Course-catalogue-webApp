import {createSlice} from "@reduxjs/toolkit";
const courseSlice=createSlice({
    name:"courseList",
    initialState:{
        courses:[],
    },
    reducers:{
        updateList:(state,action)=>{
            state.courses=[...action.payload];
        },
        
    }
})



export default courseSlice.reducer;
export const {updateList}= courseSlice.actions;

export const selectCoursesByUid = (state, uid) => {
  
   const data= state.courseList.courses.filter((course) => course.uid === uid);
   
   return data;
  };
  
