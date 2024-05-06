import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CourseList from './pages/CourseList';
import Signin from './pages/Signin';
import { auth } from './firebase';
import './App.css'

function App() {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return unsubscribe; // Cleanup function to unsubscribe from the observer
  }, []);

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        {/* <Route path="/dashboard/*" element={<Dashboard currentUser={currentUser}/>} />
        <Route path="/courselist" element={<CourseList />} /> */}

<Route
          path="/dashboard/*"
          element={currentUser ? <Dashboard currentUser={currentUser} /> : <Navigate to="/signin" />}
        />
        <Route
          path="/courselist"
          element={currentUser ? <CourseList /> : <Navigate to="/signin" />}
        />

      </Routes>
    </Router>
    </>
  )
}

export default App