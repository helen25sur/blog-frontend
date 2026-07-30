import { apiFetch } from "./api";

export const checkLoginStatus = async (link, setIsLoggedIn) => {
  try {
    const response = await apiFetch(`${link}status`, {
      method: 'GET',
      credentials: 'include', // Обов'язково для передачі сесійної куки
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Login status:', data);
      setIsLoggedIn(data.isAuthenticated);
    } else {
      setIsLoggedIn(false);
    }
  } catch (err) {
    console.log(err);
    console.error('Error checking login status:', err);
    setIsLoggedIn(false);
  }
}

export async function authRequest(link, endpoint, body) {
  const response = await apiFetch(`${link}${endpoint}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
}