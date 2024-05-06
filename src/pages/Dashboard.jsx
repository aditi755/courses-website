import React , {useState, useEffect} from 'react'
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebase'; // Import your Firestore instance
import {Link} from "react-router-dom"
const Dashboard = ({currentUser}) => {
    console.log(currentUser)
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      const fetchUserData = async () => {
        if (currentUser) {
          try {
            const userQuery = query(collection(db, 'users'), where('uid', '==', currentUser.uid));
            const querySnapshot = await getDocs(userQuery);
  
            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                setUserData(doc.data());
              });
            } else {
              console.log('No user data found');
            }
          } catch (error) {
            console.error('Error fetching user data:', error.message);
          }
        }
      };
  
      fetchUserData();
    }, [currentUser]);
  
  return (
    <div>
        <nav className="flex w-full h-auto bg-blue-700 text-white text-2xl align-center justify-center gap-10">
        <Link to="/courseList">Courses</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <h2>Welcome to Dashboard</h2>
      {userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* Display other user details as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
        </div>
  )
}

export default Dashboard