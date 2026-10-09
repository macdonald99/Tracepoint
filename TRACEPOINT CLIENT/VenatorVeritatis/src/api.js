const API_BASE_URL = "http://localhost:5012";

export async function apiGet(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `API error (${response.status}): ${response.statusText}`);
  }
  return response.json();
}

export async function apiPost(endpoint, body) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `API error (${response.status}): ${response.statusText}`);
  }

  return response.json();
}