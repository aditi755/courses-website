// import React, {useState, useEffect} from 'react'
// import {Link} from "react-router-dom"
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../firebase';

// const CourseList = () => {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'courses'));
//         const coursesData = querySnapshot.docs.map(doc => doc.data());
//         setCourses(coursesData);
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//       }
//     };

//     fetchCourses();
//   }, []);
  
//   return (
//     <div>
//          <nav className="flex w-full h-auto bg-blue-700 text-white text-2xl align-center justify-center gap-10">
//         <Link to="/courseList">Courses</Link>
//         <Link to="/dashboard">Dashboard</Link>
//       </nav>

//       <h2>Course Listing</h2>
//     <ul>
//       {courses.map(course => (
//         <li key={course.id}>
//           <h3>{course.name}</h3>
//           <p>Instructor: {course.instructor}</p>
//           {/* Display other basic course information */}
//         </li>
//       ))}
//     </ul>

//         CourseList</div>
//   )
// }

// export default CourseList

import React, { useState, useEffect } from 'react';
import { collection, getDocs, getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from "react-router-dom"

const CourseList = ({currentUser}) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesRef = collection(db, 'courses');
      const coursesSnapshot = await getDocs(coursesRef);
      const coursesData = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }
    ));
      setCourses(coursesData);
    };

    fetchCourses();
  }, []);


  const handleEnroll = async (courseId) => {
    try {
      const courseRef = doc(db, 'courses', courseId);
      const courseDoc = await getDoc(courseRef);
      if (courseDoc.exists()) {
        const courseData = courseDoc.data();
        const enrolledUsers = courseData.enrolledUsers || []; // Initialize enrolledUsers to an empty array if it's undefined
        // Update the enrolledUsers array of the course document
        await updateDoc(courseRef, {
          enrolledUsers: [...enrolledUsers, currentUser.uid]
        });
        alert('Enrolled successfully!');
      } else {
        console.error('Course not found.');
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };
  
  return (
    <>
        <nav className="flex w-full h-auto bg-blue-700 text-white text-2xl align-center justify-center gap-10">
        <Link to="/courseList">Courses</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Course List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
            <img src={course.thumbnail} alt={course.name} className="w-full h-32 object-cover mb-4" />
            <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
            <p className="text-gray-700 mb-4">{course.description}</p>
            <div className="flex justify-between">
              <span className="text-gray-600">{course.instructor}</span>
              <span className="text-gray-600">{course.duration}</span>
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-gray-600">{course.location}</span>
              <button onClick={() => {handleEnroll(course.id)}} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Enroll</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default CourseList;
