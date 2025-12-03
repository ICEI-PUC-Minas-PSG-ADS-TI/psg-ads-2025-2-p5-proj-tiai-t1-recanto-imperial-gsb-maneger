// src/api.ts
const API_BASE_URL = "http://localhost:5048/api";

async function apiGet(path: string) {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `GET ${path} -> ${res.status}`);
  }
  return res.json();
}

async function apiPost(path: string, body: any) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `POST ${path} -> ${res.status}`);
  }
  return res.json();
}

async function apiDelete(path: string) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `DELETE ${path} -> ${res.status}`);
  }
}

export { apiGet, apiPost, apiDelete };
