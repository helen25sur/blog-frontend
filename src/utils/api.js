// CSRF:
// initCsrf() запускається перед apiFetch
// apiFetch чекає csrfTokenPromise
// credentials include обов'язковий
// csrf middleware після session

let csrfTokenPromise = null;

export function resetCsrf() {
  csrfTokenPromise = null;
}

export function initCsrf(link) {
  if (!csrfTokenPromise) {
    csrfTokenPromise = fetch(`${link}csrf-token`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => data.csrfToken);
  }

  return csrfTokenPromise;
}

export async function apiFetch(url, options = {}) {
  if (!csrfTokenPromise) {
    throw new Error("initCsrf() must be called before apiFetch()");
  }

  const csrfToken = await csrfTokenPromise;
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