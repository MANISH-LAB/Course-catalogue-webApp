// userSlice.js

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    username: "",
    email: "",
    enrolledCourses: [],
    likedCourses: [],
  },
  reducers: {
    setUser: (state, action) => {
      const { id, username, email } = action.payload;
      state.id = id;
      state.username = username;
      state.email = email;
    },
    enrollCourse: (state, action) => {
      const courseNumber = action.payload;
      state.enrolledCourses.push(courseNumber);
    },
    likeCourse: (state, action) => {
      const courseNumber = action.payload;
      state.likedCourses.push(courseNumber);
    },
    unlikeCourse: (state, action) => {
      const courseNumber = action.payload;
      state.likedCourses = state.likedCourses.filter(
        (course) => course !== courseNumber
      );
    },
  },
});

export const { setUser, enrollCourse, likeCourse, unlikeCourse } =
  userSlice.actions;

export default userSlice.reducer;
