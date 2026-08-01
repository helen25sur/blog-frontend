import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reset } from '../services/auth';
import AuthLayout from '../components/AuthLayout';
import ErrorMessage from '../components/Error';

export default function Reset({ link }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await reset(link, email);
      console.log(data);
      navigate('/');
    } catch (err) {
      console.error('Reset error:', err);
      setError(err.message);
    }
  };

  return (
    <AuthLayout
      title="RESET PASSWORD"
      subtitle="Enter your email to reset your password."
      footerText="Remember your password?"
      footerLinkText="Login"
      footerLinkHref="/login"
    >

      {error && (
        <ErrorMessage>
          <span>{error}</span>
        </ErrorMessage>
      )}

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

        {/* <!-- Submit Button --> */}
        <button
          type="submit"
          className="w-full py-3 bg-black text-white font-medium rounded-md hover:bg-gray-900 cursor-pointer transition"
        >
          Reset Password
        </button>

      </form>
    </AuthLayout>
  );
}