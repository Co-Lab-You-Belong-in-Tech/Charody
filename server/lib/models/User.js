const Listing = require('./Listing.js');

let client;
let users;

class User {
  static async injectDB(conn) {
    if (users) {
      return;
    }
    try {
      client = await conn.db(process.env.DB_NAMESPACE);
      users = client.collection('users');
    } catch (e) {
      console.error(`Unable to establish collection handles in user: ${e}`);
    }
  }

  /**
   * Finds a user in the `users` collection
   * @param {string} email - The email of the desired user
   * @returns {Object | null} Returns either a single user or nothing
   */
  static async getUser(email) {
    return await users.findOne({ email });
  }

  /**
   * Adds a user to the `users` collection
   * @param {UserInfo} userInfo - The information of the user to add
   */
  static async addUser(userInfo) {
    const { email, passwordHash } = userInfo;
    try {
      const result = await users.insertOne({ email, passwordHash }, { writeConcern: 'majority' });
      return await users.findOne(
        { _id: result.insertedId },
        { projection: { passwordHash: 0 } }
      );
    } catch (e) {
      if (String(e).startsWith('MongoError: E11000 duplicate key error')) {
        throw new Error('A user with the given email already exists.');
      }
    }
  }

  static async deleteUser(email) {
    const user = await this.getUser(email);
    if (!user) {
      throw new Error('User does not exist');
    }

    const session = client.startSession();

    const transactionOptions = {
      readPreference: 'primary',
      readConcern: { level: 'local' },
      writeConcern: { w: 'majority' }
    };

    await session.withTransaction(async () => {
      await Listing.deleteListing(user._id);
      await users.deleteOne({ email });
    }, transactionOptions);
  
    await session.endSession();
    
    if (await this.getUser(email)) {
      throw new Error('Deletion unsuccessful');
    }
  }

  static async checkOfficial(email) {
    const { isOfficial } = await this.getUser(email);
    return isOfficial || false;
  }

  static async makeOfficial(email) {
    const updateResponse = users.updateOne(
      { email },
      { $set: { isOfficial: true } },
    );
    return updateResponse;
  }
}

/**
 * Parameter passed to addUser method
 * @typedef UserInfo
 * @property {string} email
 * @property {string} passwordHash
 */

module.exports = User;
