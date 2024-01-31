import { createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from 'immer';
import { produce } from 'immer';

// Call enableMapSet before using Immer produce
enableMapSet();

// ... rest of your code

const userGroupSlice = createSlice({
  name: 'userGroup',
  initialState: [], // Corrected: initialState should be a single array
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    updateUserEnrolledCourseList: (state, action) => {
        const { userID, course_number } = action.payload;
      
        const userIndex = state.findIndex((user) => user.id === userID);
      
        if (userIndex !== -1) {
          // Convert enrolled_course Set to an array
          const enrolledCoursesArray = [...state[userIndex].enrolled_course];
          
          // Update the array
          enrolledCoursesArray.push(course_number);
      
          // Convert the array back to a Set
          const updatedEnrolledCourses = new Set(enrolledCoursesArray);
      
          state[userIndex] = {
            ...state[userIndex],
            enrolled_course: updatedEnrolledCourses,
          };
        }
      },
      
   

// ...

deleteUserEnrolledCourse: (state, action) => {
  const { userID, course_number } = action.payload;
  console.log(action.payload);
  console.log(userID,course_number);
  return produce(state, (draftState) => {
    // Find the index of the user in the array
    const userIndex = draftState.findIndex((user) => user.id === userID);
  console.log(userIndex);
    // If the user is found, remove the course_number from enrolled_courses
    if (userIndex !== -1) {
      // Create a new Set excluding the course_number to remove
      draftState[userIndex].enrolled_course.delete(course_number);
      console.log(draftState[userIndex].enrolled_course);
    }
  });
},

      
  },
});

export const { addUser, updateUserEnrolledCourseList,deleteUserEnrolledCourse } = userGroupSlice.actions;

export const selectEnrolledCoursesByUserId = (state, userId) => {
    console.log(state);
    const userID=parseInt(userId);
    const userIndex = state.findIndex((user) => { 
        console.log(user,user.id,userID); 
        return user.id === userID}
        );
    console.log(userId,userIndex,state[userIndex]);
    return state[userIndex].enrolled_course;
}
export const enrolledCoursesByUserIdCount = (state, userId) => {
    
    const userID=parseInt(userId);
    const userIndex = state.findIndex((user) => { 
        console.log(user,user.id,userID); 
        return user.id === userID}
        );
    console.log("size of pur",state[userIndex].enrolled_course.size());
    return state[userIndex].enrolled_course.size();
}

export default userGroupSlice.reducer;
