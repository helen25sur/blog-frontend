import { apiFetch } from "../utils/api";

export async function createPost(link, postData) {
  const response = await apiFetch(`${link}posts`, {
    method: "POST",
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error(`Create post error: ${response.status}`);
  }

  return response.json();
}