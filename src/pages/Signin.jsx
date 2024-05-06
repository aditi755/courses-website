import React, { useState } from 'react';
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from 'react-router-dom'
const Signin = () => {
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


  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      // Create user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log(userCredential)
      const user = userCredential.user;
    alert('User signed in:', user);
    navigate("/dashboard")

    } catch (error) {
      console.error('Error signing in:', error.message);
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form onSubmit={handleSignin}>
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
          <button type="submit" onClick={handleSignin}className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Sign In</button>
        </div>
      </form>
     
    </div>
  );
};

export default Signin;
