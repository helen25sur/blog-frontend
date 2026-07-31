import { apiFetch } from "../utils/api";

export const checkLoginStatus = async (link, setIsLoggedIn) => {
  try {
    const response = await apiFetch(`${link}status`, {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      console.log("STATUS RESPONSE", data);
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
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export async function login(link, email, password) {
  const response = await apiFetch(`${link}login`, {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function signup(link, body) {
  const response = await apiFetch(`${link}signup`, {
    method: 'POST',
    body: JSON.stringify(body)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function logout(link) {
  const response = await apiFetch(`${link}logout`, {
    method: 'POST'
  });

  if (!response.ok) {
    throw new Error(`Logout error: ${response.status}`);
  }

  return response.json();
}