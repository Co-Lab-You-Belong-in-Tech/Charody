const User = require('./User.js');

/** @type {require('mongodb').Collection} */
let listings;

class Listing {
  static async injectDB(conn) {
    if (listings) {
      return;
    }
    try {
      listings = await conn.db(process.env.DB_NAMESPACE).collection('listings');
    } catch (e) {
      console.error(`Unable to establish collection handles in user: ${e}`);
    }
  }

  /**
   * Finds the listing created by a specific user.
   * @param {string} email - The email of the desired user
   * @returns {Object | null} Returns either a single user or nothing
   */
  static async getUsersListing(email) {
    const user = User.getUser(email);
    return await listings.findOne({ userId: user._id });
  }

  /**
   * Adds a listing to the `listings` collection
   * @param {ListingInfo} listingInfo - The information of the listing to add
   */
  static async upsertListing(listingInfo) {
    const {
      firstName,
      lastName,
      phone,
      userId,
      zipcode,
      allowKids,
      allowsCats,
      allowsDogs,
      noStairs,
      numberOfDaysAvailable,
      currentlyAvailable
    } = listingInfo;

    return await listings.updateOne({
      userId
    },
    {
      $set: {
        firstName,
        lastName,
        phone,
        userId,
        zipcode,
        allowKids,
        allowsCats,
        allowsDogs,
        noStairs,
        numberOfDaysAvailable,
        currentlyAvailable
      }
    }, {
      writeConcern: 'majority',
      upsert: true
    });
  }

  static async deleteListing(userId, session) {
    await listings.deleteOne({ userId }, { session });
  }

  /**
   * Provides a paginated list of Listings that match the search criteria
   * @param {SearchCriteria} searchCriteria - The criteria to search by.
   * @param {number} count - The maximum amount of listings to return.
   * @param {number} page - The 1 based page number, this query skips (count * (page - 1)) results.
   */
  static async searchListingsByZipcode(searchCriteria) {
    let {
      zipcodes,
      count,
      page,
      ...rest
    } = searchCriteria;

    count = count ? count : 10;
    page = page ? page : 1;

    const query = {
      zipcode: { $in: zipcodes }
    };

    // Make the query ignorant of false values
    Object.keys(rest).map(key => {
      if(rest[key]) {
        query[key] = true;
      }
    });

    console.log('asdfasdfasdfasdf');
    console.log(query);

    return await listings.find(query).skip(count * (page - 1)).limit(count).toArray();
  }
}

/**
 * The information included in a listing
 * @typedef ListingInfo
 * @property {string} userId
 * @property {number} zipcode
 * @property {boolean} allowsCats
 * @property {boolean} allowsDogs
 * @property {boolean} noStairs
 * @property {number} numberOfDaysAvailable
 * @property {boolean} currentlyAvailable
 */

/**
 * @typedef SearchCriteria
 * @property {number[]} zipcodes
 * @property {boolean} allowsCats
 * @property {boolean} allowsDogs
 * @property {boolean} noStairs
 * @property {number} count
 * @property {number} page
 */

module.exports = Listing;
