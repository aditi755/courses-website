// import React, { useState, useEffect } from 'react';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../firebase';

// const Dashboard = ({ currentUser }) => {
//   const [enrolledCourses, setEnrolledCourses] = useState([]);

//   useEffect(() => {
//     const fetchEnrolledCourses = async () => {
//       if (!currentUser) return;

//       const coursesRef = collection(db, 'courses');
//       const q = query(coursesRef, where('students', 'array-contains', currentUser.uid));
//       const querySnapshot = await getDocs(q);
//       const coursesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setEnrolledCourses(coursesData);
//       console.log(coursesData)
//     };

//     fetchEnrolledCourses();
//   }, [currentUser]);

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
//       {enrolledCourses.length === 0 ? (
//         <p>No enrolled courses</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {enrolledCourses.map(course => (
//             <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
//               <p className="text-gray-700 mb-4">Instructor: {course.instructor}</p>
//               <p className="text-gray-700 mb-4">Due Date: {course.dueDate}</p>
//               {/* Progress bar */}
//               <div className="bg-gray-200 rounded-full">
//                 <div className="bg-blue-500 text-xs leading-none py-1 text-center text-white rounded-full" style={{ width: `${course.progress}%` }}>
//                   {course.progress}%
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from "react-router-dom"

const Dashboard = ({ currentUser }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!currentUser) return;

      // Query Firestore to get enrolled courses for the current user
      const q = query(collection(db, 'courses'), where('enrolledUsers', 'array-contains', currentUser.uid));
      const querySnapshot = await getDocs(q);
      const enrolledCoursesData = querySnapshot.docs.map(doc => doc.data());
      setEnrolledCourses(enrolledCoursesData);
    };

    fetchEnrolledCourses();
  }, [currentUser]);

  const markCourseAsCompleted = async (courseId) => {
    // Update Firestore to mark course as completed for the current user
    const courseRef = doc(db, 'courses', courseId);
    await updateDoc(courseRef, {
      completedBy: {
        [currentUser.uid]: true
      }
    });
  };

  return (
    <>
        <nav className="flex w-full h-auto bg-blue-700 text-white text-2xl align-center justify-center gap-10">
        <Link to="/courseList">Courses</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    <div>
      <h2>Enrolled Courses</h2>
      <ul>
        {enrolledCourses.map(course => (
          <li key={course.id}>
            <h3>{course.name}</h3>
            <p>Instructor: {course.instructor}</p>
            <img src={course.thumbnail} alt={course.name} />
            <p>Due Date: {course.dueDate}</p>
            {/* Add progress bar and completion status */}
            <button onClick={() => markCourseAsCompleted(course.id)}>Mark as Completed</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Dashboard;

