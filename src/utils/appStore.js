import {configureStore} from "@reduxjs/toolkit";
import courseListReducer from "./courseSlice";
import userReducer from "./userSlice";
import userGroupReducer from "./userGroupSlice"
import handleHeaderStateReducer from "./handleHeaderStateSlice";


const appStore=configureStore({
        reducer:{
          courseList: courseListReducer,
          user: userReducer,
          userGroup: userGroupReducer,
          handleHeaderState: handleHeaderStateReducer,
         
        
        },
        
})
export default appStore;
