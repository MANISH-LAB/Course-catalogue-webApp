import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCoursesByUid } from '../utils/courseSlice';
import { useDispatch } from 'react-redux';
import { updateUserEnrolledCourseList, deleteUserEnrolledCourse } from "../utils/userGroupSlice";

function EnrolledCourseCard({ course_number }) {
  const [completedModules, setCompletedModules] = useState([]);
  const [progress, setProgress] = useState(0);
  const [enrolled, setEnrolled] = useState(false);
  const dispatch = useDispatch();

  const course = useSelector((state) => selectCoursesByUid(state, course_number));

  const userid = useSelector((store) => store.handleHeaderState.id);

  useEffect(() => {
    console.log(course[0]);
   if(course.study_guide!==undefined){
    const totalModules = course[0].study_guide.length;
    const currentProgress = (completedModules.length / totalModules) * 100;
    setProgress(currentProgress);}
  }, [completedModules]);

  const handleModuleCompletion = (moduleId) => {
    const index = completedModules.indexOf(moduleId);
    if (index === -1) {
      setCompletedModules([...completedModules, moduleId]);
    } else {
      setCompletedModules(completedModules.filter((id) => id !== moduleId));
    }
  };


  const handleDisEnroll = () => {
   
      dispatch(deleteUserEnrolledCourse({ userID: userid, course_number: course_number }));
      console.log("clkd");
   
  };

  return course[0] ? (
    <div className="h-screen w-full">
      <div className="course-card p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <div>
            <img
              src={course[0].icon_url}
              alt={course[0].title}
              className="w-24 h-24 mr-4 object-cover object-center rounded-full border border-gray-300"
            />
            <div>
              <h2 className="text-2xl font-semibold text-blue-600">{course[0].title}</h2>
              <h4 className="text-md flex text-gray-600">
                Created by <div className="text-blue-600 px-2">{course[0].instructor}</div>
              </h4>
              <p className="text-gray-600">Duration: {course[0].duration_in_hours} hours</p>
            </div>
            <div>  
            <button className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700" onClick={handleDisEnroll}>
            Dis-Enroll
          </button>  </div>
          </div>
        </div>
        <div className="text-gray-700">
            {progress!==100 ?( <h4 className="mt-4 text-blue-600 p-2 m-2">Mark Complete:</h4>):
            
            <h4 className="mt-4 text-green-500 font-bold p-2 m-2">Course Completed ✅</h4>}
        
          <div className="mt-4 flex flex-wrap p-4 m-4">
            {course[0].study_guide.map((module, index) => (
              <div key={module.uid} className="flex items-center mb-2">
                <div
                  className={`w-4 h-4 m-2 ${
                    completedModules.includes(module.uid) ? 'bg-green-500' : 'bg-blue-600'
                  } rounded-full`}
                  onClick={() => handleModuleCompletion(module.uid)}
                ></div>
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
        </div>
        <div className="mt-4">
          <a href={course[0].url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Go to Course
          </a>
        </div>
        <div className="mt-4">
          <p className="text-blue-600">Due Date: {"30 days from the time of enrolment"}</p>
          <div className="flex items-center">
            <p className="text-blue-600">Progress:</p>
            <div className="flex items-center ml-2">
              <div className="w-32 h-2 bg-gray-300 rounded-full">
                <div className={`h-2 bg-blue-600 rounded-full transition-all duration-300 ease-in-out w-${progress}`}></div>
              </div>
              <p className="text-blue-600 ml-2">{progress.toFixed(2)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default EnrolledCourseCard;
