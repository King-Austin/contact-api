'use client';

import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/token/', {
        username: email, // Assuming the backend uses "username" for email
        password,
      });
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      router.push('/contacts'); // Redirect to contacts page
    } catch (error) {
      setErrorMessage('Invalid credentials. Try again.');
    }
  };

  return (
    <div className="py-6">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        {/* Left Column: Background Image */}
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
          }}
        ></div>

        {/* Right Column: Login Form */}
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">CONTACT TECH SUPPORT</h2>
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-100 text-red-700 p-2 rounded mt-4 text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <a href="#" className="text-xs text-gray-500">
                  Forget Password?
                </a>
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
              >
                Login
              </button>
            </div>
          </form>

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <a href="#" className="text-xs text-gray-500 uppercase">
              or sign up
            </a>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;