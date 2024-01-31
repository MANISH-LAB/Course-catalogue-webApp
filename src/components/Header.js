import React, { useState } from "react";
import { Link } from "react-router-dom";

import { IMG_LOGO } from "../utils/constants";

import {useSelector} from "react-redux";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const loggedin=useSelector((store)=>store.handleHeaderState.loggedin);
  const loggedID=useSelector((store)=> store.handleHeaderState.id);
 
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex justify-between bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="text-xl">
          <Link to="/">
            <div className="flex flex-wrap items-center">
              <img className="p-4 m-4 h-32" src={IMG_LOGO} alt="Logo" />
            </div>
          </Link>
        </div>

        {/* Responsive Navbar Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleNavbar}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        {/* Normal Navbar */}
        <div className={`lg:flex m-2 p-2 ${isOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-wrap">
            <li
              id="home"
              className="px-4 pt-6 hover:font-bold text-2xl hover:text-green-200"
            >
              <button className="hover:bg-black p-2 rounded-md m-2">
                <Link to="/">Home</Link>
              </button>
            </li>
            <li
              className="px-4 pt-6 hover:font-bold text-2xl hover:text-white"
            >
              <button className="hover:bg-black p-2 rounded-md m-2">
                <Link to="/courselist">Courses</Link>
              </button>
            </li>
            {loggedin?(<li
              className="px-4 pt-6 hover:font-bold text-2xl hover:text-indigo-400"
            >
              <button className="hover:bg-black p-2 rounded-md m-2">
                {/* {count!==0 ? (<span>count</span>):(<span></span>)} */}
              <Link to={"/user/"+loggedID}>Student</Link>
              </button>
            </li>):
            (
            <li
              className="px-4 pt-6 hover:font-bold text-2xl hover:text-indigo-400"
            >
              <button className="hover:bg-black p-2 rounded-md m-2">
              <Link to="/login">Login</Link>
              </button>
            </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
