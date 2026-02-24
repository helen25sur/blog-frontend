import { Link } from "react-router-dom";

export default function Navigation({ isLoggedIn, setIsLoggedIn, link }) {
  console.log(isLoggedIn);

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
        window.location.href = '/login';
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <nav className="flex justify-between width-full mb-10 items-center">
      <div className="logo">
        <h2 className="font-[Inter] text-2xl font-semibold leading-7">
          <Link to="/">Surilova</Link>
        </h2>
      </div>
      <ul className="flex items-center gap-10">
        <li className="underline">
          <Link to="/">Home</Link>
        </li>
        <li className="underline">
          <Link to="/all">Posts</Link>
        </li>
        {isLoggedIn && (
          <li className="underline">
            <Link to="/posts/add-post">Add Post</Link>
          </li>
        )}
        {!isLoggedIn && (
          <li className="border border-solid rounded-lg px-4 py-1">
            <Link to="/login">Login</Link>
          </li>
        )}
        {isLoggedIn && (
          <li className="border border-solid rounded-lg px-4 py-1">
            <Link to="/logout" onClick={logoutHandler}>Logout</Link>
          </li>
        )}
      </ul>
    </nav>
  )
}