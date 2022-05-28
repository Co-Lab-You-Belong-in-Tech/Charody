import { apiUrl } from '../utils/apiUrl.js';

/**
 * 
 * @typedef UpsertProfileData
 * @type {object}
 * @property {string} firstName
 * @property {string} lastName
 * @property {number} zipcode - must be an integer
 * @property {boolean} allowsCats
 * @property {boolean} allowsDogs
 * @property {boolean} noStairs - is stair climbing required to live in the home
 * @property {number} noStairs - must be an integer
 * @property {boolean} currentlyAvailable - is the home owner currently accepting refugees
 */

/**
 * Creates a new profile entry for a homeowner, or updates their existing profile entry
 * @param {UpsertProfileData} profile 
 * @returns {{ ok: 'ok'} | Error}
 */
export const upsertProfile = async (profile) => {
  const res = await fetch(`${apiUrl}/listings/`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profile),
  });
  const json = await res.json()
  console.log(json)
  return json
};