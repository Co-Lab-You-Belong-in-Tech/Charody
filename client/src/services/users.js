import { apiUrl } from '../utils/apiUrl.js';

export const getUser = async () => {
  try {
    const res = await fetch(`${apiUrl}/users/me`, { credentials: 'include' });
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export const logIn = async (email, password) => {
  const res = await fetch(`${apiUrl}/users/sessions`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const signUp = async (email, password) => {
  const res = await fetch(`${apiUrl}/users`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const logOut = async () => {
  const res = await fetch(`${apiUrl}/users/sessions`, {
    credentials: 'include',
    method: 'DELETE',
  });
  return res.json();
};