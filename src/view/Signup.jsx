import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkLoginStatus, signup } from '../services/auth';
import AuthLayout from '../components/AuthLayout';
import ErrorMessage from '../components/Error';
import { form } from '../styles/formStyles.jsx';

export default function Signup({ link, setIsLoggedIn, setCurrentUser }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await signup(link, { username, email, password, confirmPassword });
      await checkLoginStatus(link, setIsLoggedIn);
      setIsLoggedIn(true);
      setCurrentUser(data.user);
      navigate('/');
    } catch (error) {
      setError(error.message);
      console.error('Signup error:', error);
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

  const inputStyle = form.input;
  const labelStyle = form.label;
  const buttonDarkStyle = form.buttonDark;

  return (
    <AuthLayout
      title="SIGNUP"
      subtitle="Welcome! Please enter your details."
      footerText="Already have an account?"
      footerLinkText="Log in"
      footerLinkHref="/login"
    >

      {error && (
        <ErrorMessage>
          <span>{error}</span>
        </ErrorMessage>
      )}

      <form onSubmit={handleSubmit}
        className="space-y-6">
        {/* <!-- Username Field --> */}
        <div className='flex flex-col gap-2'>
          <label htmlFor="username" className={labelStyle}>
            Username
          </label>
          <input
            onChange={handleInputChange}
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            className={inputStyle}
          // required
          />
        </div>
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
          // required
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
          // required
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="confirmPassword" className={labelStyle}>
            Confirm Password
          </label>
          <input
            onChange={handleInputChange}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            className={inputStyle}
          // required
          />
        </div>

        {/* <!-- Remember Me --> */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 border border-gray-600 focus:ring-0 focus:ring-offset-0"
            />
            <span className="ml-2 text-sm text-gray-800">Remember me</span>
          </label>
        </div>

        {/* <!-- Submit Button --> */}
        <button
          type="submit"
          className={`w-full py-3 ${buttonDarkStyle}`}
        >
          Sign up
        </button>
      </form>
    </AuthLayout>
  )

}