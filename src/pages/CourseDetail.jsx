import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';


const CourseDetail = () => {
    const { id } = useParams();
const [course, setCourse] = useState(null);
const [isSyllabusExpanded, setIsSyllabusExpanded] = useState(false);

useEffect(() => {
  const fetchCourse = async () => {
    const courseRef = doc(db, 'courses', id);
    const courseDoc = await getDoc(courseRef);
    if (courseDoc.exists()) {
      setCourse(courseDoc.data());
    } else {
      console.error('Course not found.');
    }
  };

  fetchCourse();
}, [id]);

if (!course) {
  return <div>Loading...</div>;
}


const handleSyllabusToggle = () => {
    setIsSyllabusExpanded(prevState => !prevState);
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <img src={course.thumbnail} alt={course.name} className="w-full h-auto mb-4" />
        <h1 className="text-3xl font-semibold mb-4">{course.name}</h1>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Instructor: {course.instructor}</h2>
          <p className="text-gray-600 mb-2">Duration: {course.duration}</p>
          <p className="text-gray-600 mb-2">Schedule: {course.schedule}</p>
          <p className="text-gray-600 mb-2">Location: {course.location}</p>
          <p className="text-gray-600 mb-2">Enrollment Status: {course.enrollmentStatus}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Prerequisites</h2>
          <ul className="list-disc list-inside">
            {course.prerequisites.map((prerequisite, index) => (
              <li key={index}>{prerequisite}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
      <h2 className="text-xl mt-6 mb-3 cursor-pointer" onClick={handleSyllabusToggle}>
        Syllabus {isSyllabusExpanded ? '▲' : '▼'}
      </h2>
      {isSyllabusExpanded && (
        <ul className="divide-y divide-gray-300">
          {course.syllabus.map(item => (
            <li key={item.week} className="py-4">
              <h3 className="text-lg font-semibold">Week {item.week}</h3>
              <p className="mt-2 text-gray-700">{item.topic}</p>
              <p className="mt-2 text-gray-600">{item.content}</p>
            </li>
          ))}
        </ul>
      )}


        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
