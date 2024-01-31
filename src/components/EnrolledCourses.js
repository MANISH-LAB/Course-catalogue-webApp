import React from 'react'
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import { selectCoursesByUid } from '../utils/courseSlice';
import {selectEnrolledCoursesByUserId} from "../utils/userGroupSlice"
import EnrolledCourseCard from './EnrolledCourseCard';
const EnrolledCourses = ({userID}) => {
   
      
   //to get course from user id
   const courses=useSelector((state)=>selectEnrolledCoursesByUserId(state.userGroup,userID));
   console.log("courses jo bhaiye le hai", courses);
   //to get me course from its uid

//   const course = useSelector((state) => selectCoursesByUid(state, resID));
  return (
    <div className='p-4 m-4 flex-grow border border-red-50'>
    <div className='font-bold text-xl p-2 m-2'>My Courses</div>
    {Array.from(courses).map((course_number)=>
      <EnrolledCourseCard course_number={course_number}/>
    )}
    </div>
  )
}

export default EnrolledCourses