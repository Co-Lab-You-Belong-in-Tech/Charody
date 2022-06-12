
/**
 * 
 * @returns {import('../services/profiles.js').UpsertProfileData}
 */
export function signupStateToPostData(state) {
  const {
    firstName,
    lastName,
    phone,
    zipCode,
    accessibility,
    days,
    hosting,
  } = state;
  return {
    firstName,
    lastName,
    phone,
    zipcode: parseInt(zipCode),
    allowsKids: accessibility.kids,
    allowsCats: accessibility.cats,
    allowsDogs: accessibility.dogs,
    noStairs: accessibility.stairs,
    numberOfDaysAvailable: parseInt(days),
    currentlyAvailable: hosting
  }
}

/**
 * 
 * @typedef UpsertProfileData
 * @type {object}
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} phone
 * @property {number} zipcode - must be an integer
 * @property {boolean} allowsCats
 * @property {boolean} allowsDogs
 * @property {boolean} noStairs - is stair climbing required to live in the home
 * @property {number} numberOfDaysAvailable - must be an integer
 * @property {boolean} currentlyAvailable - is the home owner currently accepting refugees
 */