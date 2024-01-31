import React from 'react'
const Footer = () => {
    return (
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 py-8">
        <p className="text-center text-white">
          &copy; {new Date().getFullYear()} My Website. All rights reserved.
        </p>
      </div>
    );
  };

export default Footer