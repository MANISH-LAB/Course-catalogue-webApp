import React, { useState ,useEffect} from 'react';
import { useParams } from "react-router-dom";
import { useSelector ,useDispatch} from 'react-redux';
import { selectCoursesByUid } from '../utils/courseSlice';
import Shimmer from './Shimmer';
import { updateList } from '../utils/courseSlice';
import CourseListData from '../data/courseJSONDATA';
import { updateUserEnrolledCourseList ,deleteUserEnrolledCourse} from '../utils/userGroupSlice';
import { selectEnrolledCoursesByUserId } from '../utils/userGroupSlice';

const Course = () => {
  const { resID } = useParams();
  const dispatch=useDispatch();
  const [enrolled,setEnrolled]=useState(false);
  console.log("1",enrolled)
  const myID=useSelector((state)=>state.handleHeaderState.id);
  console.log("this course and my user id ",resID,myID);
  // if(myID!=-1){
  //   const courses=useSelector((state)=>selectEnrolledCoursesByUserId(state.userGroup,myID));
  //   console.log("courses i have enrolled", courses);
  //   for(var i=0;i<courses.length;i++){
  //       if(resID===courses[i]){
  //         setEnrolled(true);
  //         break;
  //       }
  //       console.log("2",enrolled)
  //   }
  // }
  //to get me course from its uid
  const course = useSelector((state) => selectCoursesByUid(state, resID));

  const sample=useSelector((store)=>store.userGroup)
  
  const userid=useSelector((store)=>store.handleHeaderState.id);
 
  const handleEnroll=()=>{
    if(userid!=-1){
    if(enrolled==false){
    dispatch(updateUserEnrolledCourseList({userID:userid,course_number:resID}));
    setEnrolled(true);
    }
    }
    else{
      alert("kindly login to enroll")
    }
    
  }
  const handleDisEnroll=()=>{
    if(enrolled==true){
        dispatch(deleteUserEnrolledCourse({userID: userid,course_number:resID}));
        setEnrolled(false);
    }
  }
  if (course[0] === undefined) {
    dispatch(updateList(CourseListData.courses));
  } else {
    
  }
  
  const [isStudyGuideExpanded, setIsStudyGuideExpanded] = useState(false);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return course[0]?(
    <div className="relative">
    
    <div className="container mx-auto">
      <div className="course-card p-4 bg-white rounded-lg shadow-md">
        <div className="flex flex-wrap justify-between">
        <div className="flex items-center mb-4">
          <img
            src={course[0].icon_url}
            alt={course[0].title}
            className="w-24 h-24 mr-4 object-cover object-center rounded-full border border-gray-300"
          />
          <div>

            <h2 className="text-2xl font-semibold text-blue-600">{course[0].title}</h2>
            <h4 className="text-md flex text-gray-600">Created by  <div className="text-blue-600 px-2">{ capitalizeFirstLetter(course[0].instructor)}</div></h4>
            <p className="text-gray-600">Duration: {course[0].duration_in_hours} hours</p>
          </div>
          
        </div>
        <div className="p-2 m-2"> 

          {!enrolled?(<button className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700" onClick={handleEnroll}>
            Enroll
          </button>):(<button className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700" onClick={handleDisEnroll}>
            Dis-Enroll
          </button>)}
          </div>
          </div>
        <div className="text-gray-700">
          <div
            className="prose max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: course[0].summary }}
          />
          <h4 id="audience-profile" className="mt-4 text-blue-600">
            Audience Profile
          </h4>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: course[0].audience_profile }} />
          <h4 className="mt-4 text-blue-600">Languages/Locales:</h4>
          <p className="mb-4">{course[0].locales.join(', ')}</p>
          <h4 className="mt-4 text-blue-600">Levels:</h4>
          <p className="mb-4">{course[0].levels.join(', ')}</p>
          <h4 className="mt-4 text-blue-600">Products Used:</h4>
          <p className="mb-4">{course[0].products.join(', ')}</p>
          <h4 className="mt-4 text-blue-600">Roles:</h4>
          <p className="mb-4">{course[0].roles.join(', ')}</p>
          <h4 className="mt-4 text-blue-600">Study Guide:</h4>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => setIsStudyGuideExpanded(!isStudyGuideExpanded)}
          >
            {isStudyGuideExpanded ? 'Collapse' : 'Expand'} Study Guide
          </button>
          {isStudyGuideExpanded && (
            <div className="mt-4">
              {course[0].study_guide.map((module, index) => (
                <div key={module.uid} className="flex items-center mb-2">
                  <div className="w-4 h-4 mr-2 bg-blue-600 rounded-full"></div>
                  <a
                    href={`https://learn.microsoft.com${module.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {module.type === 'module' ? 'Module' : 'Learning Path'} {index + 1}: {module.title}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-4">
          <a
            href={course[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Go to Course
          </a>
        </div>
      </div>
    </div>
    </div>
  ):(<div>
    {
      
    }
  </div>)
};

export default Course;
