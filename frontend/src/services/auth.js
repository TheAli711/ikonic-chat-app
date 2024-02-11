const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const signup = async (username, password) => {
  const res = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    throw await res.json();
  }
  return await res.json();
};

const login = async (username, password) => {
  const res = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    throw await res.json();
  }
  return await res.json();
};

const getProfile = async () => {
  const res = await fetch(`${BACKEND_URL}/auth/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) {
    throw await res.json();
  }
  return await res.json();
};

export { signup, login, getProfile };
