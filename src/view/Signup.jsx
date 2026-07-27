import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkLoginStatus, authRequest } from '../utils/auth';
import AuthLayout from '../components/AuthLayout';

export default function Signup({ link, setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await authRequest(link, 'signup', { username, email, password, confirmPassword });
      setIsLoggedIn(true);
      await checkLoginStatus(link, setIsLoggedIn);
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  return (
    <AuthLayout
      title="SIGNUP"
      subtitle="Welcome! Please enter your details."
      footerText="Already have an account?"
      footerLinkText="Log in"
      footerLinkHref="/login"
    >

      <form onSubmit={handleSubmit}
        className="space-y-6">
        {/* <!-- Username Field --> */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-black mb-2">
            Username
          </label>
          <input
            onChange={handleInputChange}
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            className="w-full px-4 py-3 border border-gray-600 rounded-md focus:border-black transition"
          // required
          />
        </div>
        {/* <!-- Email Field --> */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
            Email
          </label>
          <input
            onChange={handleInputChange}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-600 rounded-md focus:border-black transition"
          // required
          />
        </div>
        {/* 
                <!-- Password Field --> */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
            Password
          </label>
          <input
            onChange={handleInputChange}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 border border-gray-600 rounded-md focus:border-black transition"
          // required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-black mb-2">
            Confirm Password
          </label>
          <input
            onChange={handleInputChange}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            className="w-full px-4 py-3 border border-gray-600 rounded-md focus:border-black transition"
          // required
          />
        </div>

        {/* <!-- Remember Me --> */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 border border-gray-600 rounded focus:ring-0 focus:ring-offset-0"
            />
            <span className="ml-2 text-sm text-gray-800">Remember me</span>
          </label>
        </div>

        {/* <!-- Submit Button --> */}
        <button
          type="submit"
          className="w-full py-3 bg-black text-white font-medium rounded-md hover:bg-gray-900 cursor-pointer transition"
        >
          Sign up
        </button>
      </form>
    </AuthLayout>
  )

}