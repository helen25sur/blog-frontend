let csrfTokenPromise = null;

export function initCsrf(link) {
  csrfTokenPromise = fetch(`${link}csrf-token`, {
    credentials: "include",
  })
    .then(res => res.json())
    .then(data => data.csrfToken);
}

export async function apiFetch(url, options = {}) {
  if (!csrfTokenPromise) {
    throw new Error("initCsrf() must be called before apiFetch()");
  }

  const csrfToken = await csrfTokenPromise;
  console.log("apiFetch token:", csrfToken);
  return fetch(url, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": csrfToken,
      ...options.headers,
    },
  });
}