import React ,{useEffect} from "react";
import ReactDOM from "react-dom/client"
import { createBrowserRouter, Outlet ,RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import Course from "./components/Course";
import CourseList from "./components/CourseList";
import Footer from "./components/Footer";
import User from "./components/User";
import {Provider ,useDispatch , useSelector } from "react-redux";
import appStore from "./utils/appStore";
import Login from "./components/Login";
import FillStore from "./utils/FillStore";
const AppLayout=()=>{
  
    
  
  
    return(
        <div>
         <Provider store={appStore}>
         <FillStore/>
        <Header/>
      
        
        <Outlet/>
        
        </Provider>
      
        </div>
    )
}
const appRouter=createBrowserRouter([
    {
        path:"/",
        element:<AppLayout/>,
        children:[
            {
                 path:"/",
                 element:<Body/>,
            },
            {
                path:"/courselist",
                element:<CourseList/>,
            },
            {
            path:"/course/:resID",
            element:<Course/>,
            },
            {
            path:"/user/:userID",
            element:<User/>,
            },
            {
                path:"/login",
                element:<Login/>,
                },
        ],
        errorElement:<Error/>,
    }
])
 
const root=ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}/>)