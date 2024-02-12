const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getChats = async () => {
  const res = await fetch(`${BACKEND_URL}/chat`, {
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

const getMessages = async (chatId) => {
  const res = await fetch(`${BACKEND_URL}/chat/${chatId}`, {
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

const sendMessage = async (chatId, message) => {
  const res = await fetch(`${BACKEND_URL}/chat/${chatId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) {
    throw await res.json();
  }
  return await res.json();
};

const createChat = async (userId, message) => {
  const res = await fetch(`${BACKEND_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ userId, message }),
  });
  if (!res.ok) {
    throw await res.json();
  }
  return await res.json();
};

export { getChats, getMessages, sendMessage, createChat };
