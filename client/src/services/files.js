import { apiUrl } from '../utils/apiUrl.js';

export const uploadId = async (file) => {
  const data = new FormData()
  data.append('id', file)
  const res = await fetch(`${apiUrl}/files/id`, {
    credentials: 'include',
    method: 'POST',
    body: data,
  });
  return res
}

export const uploadSelfie = async (file) => {
  const data = new FormData()
  data.append('selfie', file)
  const res = await fetch(`${apiUrl}/files/selfie`, {
    credentials: 'include',
    method: 'POST',
    body: data,
  });
  return res
}