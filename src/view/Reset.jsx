import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reset } from '../services/auth';
import AuthLayout from '../components/AuthLayout';
import ErrorMessage from '../components/Error';
import { form } from '../styles/formStyles.jsx';

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

  const inputStyle = form.input;
  const labelStyle = form.label;
  const buttonDarkStyle = form.buttonDark;

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

        {/* <!-- Submit Button --> */}
        <button
          type="submit"
          className={`w-full py-3 ${buttonDarkStyle}`}
        >
          Reset Password
        </button>

      </form>
    </AuthLayout>
  );
}