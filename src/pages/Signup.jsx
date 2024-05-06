import React, { useState } from 'react';
import { Link } from "react-router-dom"
import Signin from './Signin';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'
import { useNavigate } from "react-router-dom"
const Signup = () => {
const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      console.log(userCredential)
      const user = userCredential.user;
      alert('User signed up:', user);
      navigate("/dashboard")
      // Optionally, you can update user profile information (e.g., name)
      await updateProfile(user, {
        displayName: formData.name
      });
      alert('User profile updated');
      navigate("/dashboard")
    } catch (error) {
      console.error('Error signing up:', error.message);
      // Handle error (e.g., display error message to user)
    }
  };


  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <button type="submit" onClick={handleSubmit}className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Sign Up</button>
        </div>
      </form>
      <div className="text-gray-700 text-center">
        Already have an account? <Link to="/signin" className="text-blue-500">SignIn</Link>
      </div>
    </div>
  );
};

export default Signup;

