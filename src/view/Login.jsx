import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import AuthLayout from '../components/AuthLayout';

export default function Login({ link, setIsLoggedIn, setCurrentUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await login(link, email, password);
      setIsLoggedIn(true);
      setCurrentUser(data.userFound)
      console.log(data);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <AuthLayout
      title="LOGIN"
      subtitle="Welcome back! Please enter your details."
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkHref="/signup"
    >

      <form
        onSubmit={handleSubmit}
        className="space-y-6">
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
            required
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
            required
          />
        </div>

        {/* <!-- Remember Me & Forgot Password --> */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 border border-gray-600 rounded focus:ring-0 focus:ring-offset-0"
            />
            <span className="ml-2 text-sm text-gray-800">Remember me</span>
          </label>
          <a href="#" className="text-sm text-black hover:underline font-medium">
            Forgot password?
          </a>
        </div>

        {/* <!-- Submit Button --> */}
        <button
          type="submit"
          className="w-full py-3 bg-black text-white font-medium rounded-md hover:bg-gray-900 cursor-pointer transition"
        >
          Login
        </button>

      </form>
    </AuthLayout>
  );
}