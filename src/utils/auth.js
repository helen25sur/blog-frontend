export const checkLoginStatus = async (link, setIsLoggedIn) => {
  try {
    const response = await fetch(`${link}status`, {
      method: 'GET',
      credentials: 'include', // Обов'язково для передачі сесійної куки
    });

    if (response.ok) {
      const data = await response.json();
      setIsLoggedIn(data.isAuthenticated);
    } else {
      setIsLoggedIn(false);
    }
  } catch (err) {
    console.error('Error checking login status:', err);
    setIsLoggedIn(false);
  }
}