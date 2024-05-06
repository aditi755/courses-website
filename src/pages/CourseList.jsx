import React from 'react'
import {Link} from "react-router-dom"
const CourseList = () => {
  return (
    <div>
         <nav className="flex w-full h-auto bg-blue-700 text-white text-2xl align-center justify-center gap-10">
        <Link to="/courseList">Courses</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
        CourseList</div>
  )
}

export default CourseList