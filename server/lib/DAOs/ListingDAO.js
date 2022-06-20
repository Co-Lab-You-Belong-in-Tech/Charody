const { ObjectId } = require('mongodb');
const User = require('./UserDAO.js');



class Listing {
  /** @type {import('mongodb').Collection} */
  listings;

  static async injectDB(conn) {
    if (this.listings) {
      return;
    }
    try {
      this.listings = await conn.db(process.env.DB_NAMESPACE).collection('listings');
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
    return await this.listings.findOne({ userId: user._id });
  }

  static async getListingsByUserId(userId) {
    console.log(userId);
    return await this.listings.findOne({ userId: ObjectId(userId) });
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
      allowsKids,
      allowsCats,
      allowsDogs,
      noStairs,
      numberOfDaysAvailable,
      currentlyAvailable
    } = listingInfo;

    return await this.listings.updateOne({
      userId
    },
    {
      $set: {
        firstName,
        lastName,
        phone,
        userId,
        zipcode,
        allowsKids,
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
    await this.listings.deleteOne({ userId }, { session });
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

    console.log(page);
    console.log('count ' + count);
    count = count ? count : 10;
    page = page ? page : 1;

    const query = {
      zipcode: { $in: zipcodes },
      currentlyAvailable: true
    };

    // Make the query ignorant of false values
    Object.keys(rest).map(key => {
      if (rest[key]) {
        query[key] = true;
      }
    });

    console.log(query);

    const results = await this.listings.aggregate([
      {
        $project: {
          _id: 0
        }
      },
      {
        $match: query
      }, {
        $skip: (page - 1) * count
      }, {
        $limit: count
      }, {
        $lookup: {
          from: 'users', 
          localField: 'userId', 
          foreignField: '_id', 
          as: 'email'
        }
      }
    ]).toArray();
    results.forEach(result => {
      result.email = result.email[0].email;
      delete result.userId;
      delete result.currentlyAvailable;
      return result;
    });
    const totalMatched = await this.listings.countDocuments(query);
    return {
      results,
      totalMatched
    };
  }

  static async getRandomUnverifiedUser() {
    const res = await this.listings.aggregate([
      {
        '$match': {
          'validVerification': {
            $in: [null, false]
          }
        }
      }, {
        '$sample': {
          'size': 1
        }
      }
    ]).toArray();

    return res[0];
  }

  static async setValidVerification(userId, valid) {
    await this.listings.updateOne({ userId }, { validVerification: valid });
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
 * @property {boolean} allowsKids
 * @property {boolean} allowsCats
 * @property {boolean} allowsDogs
 * @property {boolean} noStairs
 * @property {number} count
 * @property {number} page
 */

module.exports = Listing;
