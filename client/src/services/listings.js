import { apiUrl } from '../utils/apiUrl.js';

/**
 * @typedef Listing
 * @type {object}
 * @property {number} zipcode - must be an integer
 * @property {boolean} allowsCats
 * @property {boolean} allowsDogs
 * @property {boolean} noStairs - is stair climbing required to live in the home
 * @property {number} numberOfDaysAvailable - must be an integer
 * @property {boolean} currentlyAvailable - is the home owner currently accepting refugees
 */

/**
 * @typedef SearchListingsReturnType
 * @type {object}
 * @property {Listing[]} results
 * @property {number} totalMatched
 */

/**
 * @typedef SearchCriteria
 * @property {number} zipcode
 * @property {number} radius
 * @property {boolean} allowsCats
 * @property {boolean} allowsDogs
 * @property {boolean} noStairs
 * @property {number} count
 * @property {number} page
 */

/**
 * Finds all listings that match the search criteria
 * @param {SearchCriteria} searchCriteria
 * @param {AbortSignal} signal
 * @returns {SearchListingsReturnType | Error}
 */
export const searchListings = async (searchCriteria, signal) => {
  const res = await fetch(`${apiUrl}/listings/search`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    signal,
    body: JSON.stringify(searchCriteria)
  });
  const listings = await res.json();
  console.log(listings)
  return Array.isArray(listings.results) ? listings : {
    results: [],
    totalMatched: 0
  };
};