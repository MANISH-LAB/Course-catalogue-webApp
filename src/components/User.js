import React from 'react'
import {useSelector,useDispatch} from "react-redux";
import {useParams} from "react-router-dom"
import { updateLoggedinState ,updateUserID} from '../utils/handleHeaderStateSlice';
import {useNavigate} from "react-router-dom";
import EnrolledCourses from './EnrolledCourses';
const User = () => {
   const dispatch=useDispatch();
    const {userID} =useParams();
   const navigate=useNavigate();
  const users=useSelector((store)=>store.userGroup);
  const logoutHandler=()=>{
    dispatch(updateLoggedinState(false));
    dispatch(updateUserID(-1));
    navigate("/");
  }

  const user=users.filter((user)=>{
   
    return user.id==userID
  })

  console.log("user mila jiski nfo dikahni hai",user)
    return (user.length===0)?(<div>Not logged in</div>): (
    <div className="h-screen p-4 m-4">
        <div className="flex flex-wrap justify-between">
   <div className="font-bold text-3xl text-center p-4 m-4"><h1>Welcome {user[0].username } !</h1></div>
   <div className="rounded-md font-semibold border-blue-400 shadow-sm text-center text-black bg-blue-300 h-[38px]"><button className="p-2 " onClick={logoutHandler}>Logout</button></div>
   </div>
  <div>
     <EnrolledCourses userID={userID}/>
    </div>
  

    </div>
  )
}

export default User