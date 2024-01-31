import React from 'react'
import { useEffect } from "react";
import {useDispatch,useSelector} from "react-redux";
import { students } from "../data/students";

import { addUser } from "../utils/userGroupSlice";
const FillStore = () => {
    const dispatch = useDispatch();
  useEffect(()=>{
      
     students.map((student)=>{
      const userData = { id: student.id, username: student.name, email: student.email,enrolled_course:new Set(),liked_course:new Set(),};
     console.log(userData)
      dispatch(addUser(userData))
    // console.log(userData)
     })
  },[])

  return (
    <div>{console.log("filled")}</div>
  )
}

export default FillStore