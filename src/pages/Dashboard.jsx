import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc, doc, getDoc} from 'firebase/firestore';
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
      const enrolledCoursesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEnrolledCourses(enrolledCoursesData);
    };

    fetchEnrolledCourses();
  }, [currentUser]);


  const handleComplete = async (courseId) => {
    try {
      console.log('currentUser:', currentUser);
      console.log('courseId:', courseId);
    // Find the course with the courseId
    const course = enrolledCourses.find(course => course.id === courseId);
      // Get the reference to the course document
      const courseRef = doc(db, 'courses', courseId);     
    // Update the course document to mark it as completed for the current user
    await updateDoc(courseRef, {
      [`completedBy.${currentUser.uid}`]: true,
      progress: course.progress + 10,
    });
 
  
      alert('Course marked as completed successfully!');
    } catch (error) {
      console.error('Error marking course as completed:', error);
      alert('Failed to mark course as completed. Please try again.');
    }
  };
  
  return (
    <>
        <nav className="flex w-full h-auto bg-blue-700 text-white text-2xl align-center justify-center gap-10">
        <Link to="/courseList">Courses</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

<div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Enrolled Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map(course => (
          <div key={course.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Course Thumbnail */}
            <img src={course.thumbnail} alt={course.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              {/* Course Name */}
              <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
              {/* Instructor Name */}
              <p className="text-gray-600 mb-2">Instructor: {course.instructor}</p>
              {/* Due Date */}
              <p className="text-gray-600 mb-2">Due Date: {course.dueDate}</p>

            {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full">
         <div
     className="bg-blue-500 text-xs leading-none py-1 text-center text-white rounded-full"
     style={{ width: `${course.progress}%` }}
     >
      {course.progress}%
       </div>
       </div>
              {/* Mark as Completed Button */}
            <button
            onClick={() => handleComplete(course.id)}
            className={`mt-4 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-${course.completedBy[currentUser.uid] ? 'green-600' : 'blue-600'}`}
            style={{ backgroundColor: course.completedBy[currentUser.uid] ? '#34D399' : '#3B82F6', color: 'white' }}
            >
          {course.completedBy[currentUser.uid] ? 'Completed' : 'Mark as Completed'}
           </button>

            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Dashboard;

