import React, { useState, useEffect } from 'react';
import { collection, getDocs, getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from "react-router-dom";
import { getDatabase, ref, onValue, update, child, get } from 'firebase/database';

const CourseList = ({ currentUser }) => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [likes, setLikes] = useState(0);
  const [unsubscribeMap, setUnsubscribeMap] = useState({}); // Define unsubscribe

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesRef = collection(db, 'courses');
      const coursesSnapshot = await getDocs(coursesRef);
      const coursesData = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCourses(coursesData);
      setFilteredCourses(coursesData); // Initially set filtered courses to all courses
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    // Filter courses based on search query
    const filtered = courses.filter(course => {
      const courseName = course.name.toLowerCase();
      const instructorName = course.instructor.toLowerCase();
      const query = searchQuery.toLowerCase();
      return courseName.includes(query) || instructorName.includes(query);
    });
    setFilteredCourses(filtered);
  }, [searchQuery, courses]);

  const handleEnroll = async (courseId) => {
    try {
      const courseRef = doc(db, 'courses', courseId);
      const courseDoc = await getDoc(courseRef);
      if (courseDoc.exists()) {
        const courseData = courseDoc.data();
        const enrolledUsers = courseData.enrolledUsers || []; 
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
  
  useEffect(() => {
    const fetchLikes = async () => {
      const db = getDatabase();
      const likesRef = ref(db, 'likes'); // Reference to the 'likes' node in the database
  
      // Listen for changes to the likes count in real-time
      const unsubscribe = onValue(likesRef, (snapshot) => {
        const likesData = snapshot.val() || {};
        setLikes(likesData);
      });
  
      // Cleanup function to unsubscribe from the listener when component unmounts
      return () => unsubscribe();
    };
    fetchLikes();
  }, []);
  

  //Like feature
  const handleLike = (courseId) => {
    const db = getDatabase();
    const likesRef = ref(db, 'likes'); // Reference to the 'likes' node in the database  
    // Get the current likes count for the specified course ID
    const currentLikesRef = child(likesRef, courseId);  
    // Increment the likes count
    get(currentLikesRef)
      .then((snapshot) => {
        const currentLikes = snapshot.val() || 0;
        const updatedLikes = currentLikes + 1;
        // Update the likes count in the database
        update(likesRef, { [courseId]: updatedLikes })
          .then(() => alert('Like added successfully'))
          .catch((error) => console.error('Error adding like:', error));
      })
      .catch((error) => {
        console.error('Error getting current likes count:', error);
      });
  };
  

  return (
    <>
      <nav className="flex w-full h-auto bg-blue-700 text-white text-2xl align-center justify-center gap-10">
        <Link to="/courseList">Courses</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-4">Course List</h1>


        <div className="flex gap-6">
        <input
          type="text"
          placeholder="Search by course name or instructor"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-1/2 px-4 py-2 rounded-md border border-gray-300 mb-4"
        />
        <button className="py-2 px-4 rounded hover:bg-blue-600 bg-blue-500 text-white h-11">Search</button>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-600 p-4 rounded-md">
              {/* Render course details */}
              <img src={course.thumbnail} alt={course.name} className="w-full h-32 object-cover mb-4" />
            <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
            <p className="text-gray-700 mb-4">{course.description}</p>
            <div className="flex justify-between">
              <span className="text-gray-600">{course.instructor}</span>
              <span className="text-gray-600">{course.duration}</span>
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-gray-600">{course.location}</span>

              <div className="flex justify-end gap-7">
                      
           {/*Like feature  */}
          <div >
          <button className="py-2 px-2 rounded hover:bg-blue-600 bg-blue-400 text-white" onClick={() => handleLike(course.id)}>Likes count -</button>
          <span className="ml-2">{likes[course.id]}</span> {/* Access likes count using course id */}
        </div>

              <Link
                  to={`/courseDetail/${course.id}`}
                  className="py-2 px-4 rounded hover:bg-blue-600 bg-blue-500 text-white"
                >
                  Details
                </Link>
     
             <button
           onClick={() => {handleEnroll(course.id)}}
           className={`py-2 px-4 rounded hover:bg-blue-600 ${course.enrolledUsers?.includes(currentUser.uid) ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white'}`}
            >
             {course.enrolledUsers.includes(currentUser.uid) ? 'Enrolled' : 'Enroll'}
        </button>
        </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseList;

