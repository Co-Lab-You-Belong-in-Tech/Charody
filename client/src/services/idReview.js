import { nanoid } from '@reduxjs/toolkit';
import { apiUrl } from '../utils/apiUrl.js';

export const getIdReview = async () => {
  const res = await fetch(`${apiUrl}/idReview/?fake=${nanoid()}`, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return await res.json()
}

export const postReview = async (approved, userId) => {
  return await fetch(`${apiUrl}/idReview/${userId}`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ approved })
  });
}
