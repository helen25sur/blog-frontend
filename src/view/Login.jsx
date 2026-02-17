export default function Login({ link, setIsLoggedIn }) {

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${link}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // Цей рядок критично важливий для роботи сесій!
        credentials: 'include',
        body: JSON.stringify({
          // TODO: Test credentials, replace with actual form values
          username: 'Olenka',
          password: '123'
        })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setIsLoggedIn(true);
      window.location.href = '/';

    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-12">
        <h2 className="text-6xl font-bold text-black mb-4">LOGIN</h2>
        <p className="text-gray-700 text-lg">Welcome back! Please enter your details.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6">
        {/* <!-- Email Field --> */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
            Email
          </label>
          <input
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
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 border border-gray-600 rounded-md focus:border-black transition"
          // required
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
          Sign in
        </button>

        {/* <!-- Divider --> */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-800">Or continue with</span>
          </div>
        </div>

        {/* <!-- Social Login Buttons --> */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="py-3 px-4 border border-gray-600 rounded-md font-medium text-black hover:bg-gray-50 transition flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>
          <button
            type="button"
            className="py-3 px-4 border border-gray-600 rounded-md font-medium text-black hover:bg-gray-50 transition flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </button>
        </div>

        {/* <!-- Sign Up Link --> */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?
          <a href="#" className="text-black font-medium hover:underline"> Sign up</a>
        </p>
      </form>
    </div>
  );
}