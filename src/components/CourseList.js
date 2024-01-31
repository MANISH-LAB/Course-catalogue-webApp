// CourseList.js
import React, { useState } from 'react';
import { CourseListData } from "../data/courseJSONDATA";
import Shimmer from "./Shimmer";
import CourseCard from "./CourseCard";
import { useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { updateList } from "../utils/courseSlice";
import SearchComponent from "./SearchComponent";
// CourseList.js
const CourseList = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const dispatch = useDispatch();
  const courseItems = useSelector((store) => { console.log('Course list:', store.courseList.courses);
  return store.courseList.courses;});

  useEffect(() => {
    // Fetch initial courses data (replace with actual API call)
    dispatch(updateList(CourseListData.courses));
  }, []);

  const handleToggleAccordion = (index) => {
    if (expandedIndex === index) {
      // If the clicked card is already expanded, close it
      setExpandedIndex(null);
    } else {
      // If a different card is clicked, expand it and close others
      setExpandedIndex(index);
    }
  };

  return courseItems.length===0 ?(<div className="h-screen"><div><SearchComponent/></div>
  <div className="text-center font-bold text-red-400"><h1>No Matching result found</h1></div>
  </div>) :(
    <div>
      <div><SearchComponent/></div>

      <div className="text-center font-bold text-2xl">
        <h1>Available Courses</h1>
      </div>
      <div className="p-4  m-4 overflow-auto h-[500px]">
        {courseItems.map((course, index) => (
          <CourseCard
            key={`${course.course_number}-${index}`}
            course={course}
            isExpanded={expandedIndex === index}
            onToggleAccordion={() => handleToggleAccordion(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseList;