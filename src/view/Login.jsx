import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import AuthLayout from '../components/AuthLayout';
import ErrorMessage from '../components/Error';

export default function Login({ link, setIsLoggedIn, setCurrentUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const inputStyle = "w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black transition rounded-none";
  const labelStyle = "text-base font-semibold text-black uppercase tracking-wide";
  const buttonDarkStyle = "bg-black text-white px-6 py-3 font-medium hover:bg-gray-800 transition rounded-none cursor-pointer";

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
      setCurrentUser(data.user)
      console.log(data);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
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

      {error && (
        <ErrorMessage>
          <span>{error}</span>
        </ErrorMessage>
      )}

      <form
        noValidate
        onSubmit={handleSubmit}
        className="space-y-6 mb-8">
        {/* <!-- Email Field --> */}
        <div className='flex flex-col gap-2'>
          <label htmlFor="email" className={labelStyle}>
            Email
          </label>
          <input
            onChange={handleInputChange}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className={inputStyle}
            required
          />
        </div>
        {/* 
                <!-- Password Field --> */}
        <div className='flex flex-col gap-2'>
          <label htmlFor="password" className={labelStyle}>
            Password
          </label>
          <input
            onChange={handleInputChange}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className={inputStyle}
            required
          />
        </div>

        {/* <!-- Remember Me & Forgot Password --> */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 border border-gray-600 focus:ring-0 focus:ring-offset-0"
            />
            <span className="ml-2 text-sm text-gray-800">Remember me</span>
          </label>
          <a href="/reset" className="text-sm text-black hover:underline font-medium">
            Forgot password?
          </a>
        </div>

        {/* <!-- Submit Button --> */}
        <button
          type="submit"
          className={`w-full ${buttonDarkStyle}`}
        >
          Login
        </button>

      </form>
    </AuthLayout>
  );
}