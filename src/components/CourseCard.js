import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = (props) => {
  const { course, isExpanded, onToggleAccordion } = props;
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4">
      <button
        className="flex flex-col md:flex-row items-center justify-between p-4 focus:outline-none"
        onClick={onToggleAccordion}
      >
        <div className="flex items-center mb-4 md:mb-0">
          <img
            className="w-20 h-20 md:w-24 md:h-24 object-cover object-center rounded-full mr-4 md:mr-8"
            src={course.icon_url}
            alt={course.title}
          />
          <div>
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <h4 className="text-md flex text-gray-600">
                        Created by  
            <div className="text-blue-600 px-2">
                  {capitalizeFirstLetter(course.instructor)}
           </div>
            </h4>
            <div className="text-lg">
    <p className="text-gray-600">Duration: {course.duration_in_hours} hours</p>
  </div>
          </div>
        </div>
        
      </button>

      {isExpanded && (
        <div className="border-t border-gray-200 py-4">
          <p className="text-gray-600">
            <div dangerouslySetInnerHTML={{ __html: course.summary }} />
            <Link to={`/course/${course.uid}`}>
              <span className="block mt-4 font-bold text-red-400 hover:text-red-600">More...</span>
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
