<<<<<<< HEAD
import { apiUrl } from '../utils/apiUrl.js';

export const getUser = async () => {
  try {
    const res = await fetch(`${apiUrl}/users/me`, { credentials: 'include' });
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
=======
import { apiUrl } from '../utils/apiUrl.js'

export const getUser = async () => {
  try {
    const res = await fetch(`${apiUrl}/users/me`, { credentials: 'include' })
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}
>>>>>>> 2e823fd91035769830b4ec001bdc8308d8818481

export const logIn = async (email, password) => {
  const res = await fetch(`${apiUrl}/users/sessions`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  return res.json()
}

export const signUp = async (email, password, isOfficial) => {
  const res = await fetch(`${apiUrl}/users`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, isOfficial }),
  })
  return res.json()
}

export const logOut = async () => {
  const res = await fetch(`${apiUrl}/users/sessions`, {
    credentials: 'include',
    method: 'DELETE',
  })
  return res.json()
}

export const verifyEmail = async (email, code, signal) => {
  const params = new URLSearchParams(`email=${email}&code=${code}`)
  const res = await fetch(`${apiUrl}/users/verify?${params.toString()}`, {
    signal
  })
  return res.json()
}
