import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { postNewPassword } from '../services/auth';
import AuthLayout from '../components/AuthLayout';
import ErrorMessage from '../components/Error';

export default function NewPassword({ link }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const { token } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await postNewPassword(link, token, password, confirmPassword);

      console.log(data);
      navigate('/login');
    } catch (err) {
      console.error('New password error:', err);
      setError(err.message || "An error occurred while setting the new password.");
    }
  };

  return (
    <AuthLayout
      title="NEW PASSWORD"
      subtitle="Enter your new password."
    >

      {error && (
        <ErrorMessage>
          <span>{error}</span>
        </ErrorMessage>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6">
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

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-black mb-2">
            Confirm Password
          </label>
          <input
            onChange={handleInputChange}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Repeat your password"
            className="w-full px-4 py-3 border border-gray-600 rounded-md focus:border-black transition"
            required
          />
        </div>

        {/* <!-- Submit Button --> */}
        <button
          type="submit"
          className="w-full py-3 bg-black text-white font-medium rounded-md hover:bg-gray-900 cursor-pointer transition"
        >
          Set New Password
        </button>

      </form>
    </AuthLayout>
  );
}