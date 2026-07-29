import { NavLink, useLocation } from "react-router-dom";

export default function Navigation({ isLoggedIn, setIsLoggedIn, link }) {
  // console.log(isLoggedIn);
  const location = useLocation();

  const logoutHandler = async () => {
    setIsLoggedIn(false);
    try {
      const response = await fetch(`${link}logout`, {
        method: 'POST',
        // Обов'язково для передачі сесійної куки, щоб сервер знав, кого розлогінювати
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Очищуємо локальний стейт (наприклад, context або redux)
        // І перенаправляємо на головну або сторінку логіну
        window.location.href = '/login'; // use navigate('/') if using react-router's useNavigate
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const getLinkClass = (isActive) =>
    `text-sm font-medium transition-colors relative py-1 ${isActive
      ? 'text-gray-900 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black'
      : 'text-gray-600 hover:text-gray-900'
    }`;

  const isPostsActive =
    location.pathname.startsWith('/posts') &&
    location.pathname !== '/posts/add-post';

  return (
    <>
      <nav className="flex justify-between width-full mb-10 items-center">
        <div className="logo">
          <h2 className="font-[Inter] text-2xl font-semibold leading-7">
            <NavLink to="/">Surilova</NavLink>
          </h2>
        </div>
        <ul className="flex items-center gap-10">
          <li>
            <NavLink end className={({ isActive }) => getLinkClass(isActive)} to="/">Home</NavLink>
          </li>
          <li>
            <NavLink className={() => getLinkClass(isPostsActive)} to="/posts">Posts</NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink className={({ isActive }) => getLinkClass(isActive)} to="/posts/add-post">Add Post</NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink className={({ isActive }) => getLinkClass(isActive)} to="/profile">Profile</NavLink>
            </li>
          )}
          {!isLoggedIn && (
            <li className="border border-solid rounded-lg ">
              <NavLink className="px-4 py-1 block w-full h-full" to="/login">Login</NavLink>
            </li>
          )}
          {!isLoggedIn && (
            <li className="border border-solid rounded-lg">
              <NavLink className="px-4 py-1 block w-full h-full" to="/signup">Sign Up</NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li className="border border-solid rounded-lg">
              <NavLink className="px-4 py-1 block w-full h-full" to="/logout" onClick={logoutHandler}>Logout</NavLink>
            </li>
          )}
        </ul>
      </nav>
      <div className="divider h-px bg-[#E4E7EC] mb-10"></div>
    </>

  )
}