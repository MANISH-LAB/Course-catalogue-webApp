import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateList } from "../utils/courseSlice";
import { CourseListData } from "../data/courseJSONDATA";


const SearchComponent = () => {
  const [searchdata, setsearchdata] = useState("");
  const dispatch = useDispatch();
  const initialCourses = useSelector((state) => state.courseList.courses);
 
  const handleSearch = () => {
    // Filter courses based on the search query
    const filteredCourses = initialCourses.filter((course) =>
      course.title.toLowerCase().includes(searchdata.toLowerCase()) || course.instructor.toLowerCase().includes(searchdata.toLowerCase())
    );
   
    // Dispatch action to update the course list
    dispatch(updateList(filteredCourses));
   
    
  };

  const handleClearSearch = () => {
    // Dispatch action to reset the course list to initial state
    dispatch(updateList(CourseListData.courses));
    setsearchdata(""); // Clear the search input
  };

  return (
    <div>
      <div className="p-4 m-4">
        <input
          className="border border-solid border-black"
          type="text"
          value={searchdata}
          onChange={(e) => {
            setsearchdata(e.target.value);
          }}
        />

        <button className="px-4 py-1 m-2 bg-green-300" onClick={handleSearch}>
          Search
        </button>

        <button className="px-4 py-1 m-2 bg-red-300" onClick={handleClearSearch}>
          Clear Search
        </button>
      </div>
    </div>
  );
};

export default SearchComponent;
