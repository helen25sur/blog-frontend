import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faArrowRightToBracket, faUserPlus, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { apiFetch, initCsrf, resetCsrf } from "../utils/api";
import { form } from "../styles/formStyles";

export default function Navigation({ isLoggedIn, setIsLoggedIn, link, setCurrentUser }) {
  // console.log(isLoggedIn);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);


  const navigate = useNavigate();
  const location = useLocation();

  const buttonLightStyle = form.buttonLight;

  const logoutHandler = async () => {
    setIsLoggedIn(false);
    try {
      const response = await apiFetch(`${link}logout`, {
        method: 'POST',
      });

      if (response.ok) {
        // Очищуємо локальний стейт (наприклад, context або redux)
        resetCsrf();
        await initCsrf(link);
        setIsLoggedIn(false);
        setCurrentUser(null);
        setIsMenuOpen(false)
        navigate('/login');
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleClickMenu = () => {
    setIsMenuOpen(prev => !prev);
  }

  const getLinkClass = (isActive) =>
    `font-medium transition-colors relative py-1 ${isActive
      ? 'text-gray-900 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black'
      : 'text-gray-600 hover:text-gray-900'
    }`;

  const isPostsActive =
    location.pathname.startsWith('/posts') &&
    location.pathname !== '/posts/add-post';

  return (
    <>
      <nav className="flex justify-between width-full mb-10 items-center bg-white">

        <button onClick={handleClickMenu} className={`relative z-30 mobile-menu-btn md:hidden text-2xl ${buttonLightStyle}`}>
          <FontAwesomeIcon
            icon={isMenuOpen ? faXmark : faBars}
          />
        </button>
        <div className="logo">
          <h2 className="font-[Inter] text-2xl font-semibold leading-7">
            <NavLink to="/">Surilova</NavLink>
          </h2>
        </div>
        <ul className={`
                    ${isMenuOpen ? "flex w-full absolute top-35.25 left-0 bg-white shadow p-8 text-xl" : "hidden text-sm"}
                     md:gap-10
                    fixed top-20 left-0 w-full z-20
                    flex-col items-center gap-10
                  bg-white p-8 shadow
                    md:flex md:static md:flex-row md:shadow-none
                `}>
          <li>
            <NavLink end className={({ isActive }) => getLinkClass(isActive)} to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
          </li>
          <li>
            <NavLink className={() => getLinkClass(isPostsActive)} to="/posts" onClick={() => setIsMenuOpen(false)}>Posts</NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink className={({ isActive }) => getLinkClass(isActive)} to="/posts/add-post" onClick={() => setIsMenuOpen(false)}>Add Post</NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink className={({ isActive }) => getLinkClass(isActive)} to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</NavLink>
            </li>
          )}
        </ul>
        <ul className="flex items-center gap-10">
          {!isLoggedIn && (
            <li className={`${buttonLightStyle} relative z-40`}>
              <NavLink className=" md:px-4 md:py-0 block w-full h-full text-[0px] md:text-sm" to="/login" onClick={() => setIsMenuOpen(false)}>
                Login
                <FontAwesomeIcon className="text-3xl md:hidden" icon={faArrowRightToBracket} />
              </NavLink>
            </li>
          )}
          {!isLoggedIn && (
            <li className={`${buttonLightStyle} relative z-40`}>
              <NavLink className="md:px-4 md:py-0  block w-full h-full text-[0px] md:text-sm" to="/signup" onClick={() => setIsMenuOpen(false)}>
                Sign&nbsp;Up
                <FontAwesomeIcon className="text-3xl md:hidden" icon={faUserPlus} />
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li className={`${buttonLightStyle} relative z-40`}>
              <NavLink className="md:px-4 md:py-0 block w-full h-full text-[0px] md:text-sm" to="/logout" onClick={logoutHandler}>
                Logout
                <FontAwesomeIcon className="text-3xl md:hidden" icon={faArrowRightFromBracket} />
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      <div className="divider h-px bg-[#E4E7EC] mb-10"></div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-10 "
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>

  )
}