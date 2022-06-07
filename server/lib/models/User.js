const Listing = require('./Listing.js');

class User {
  client;

  /** @type {import("mongodb").Collection} */
  users;

  static async injectDB(client) {
    if (this.users) {
      return;
    }
    try {
      this.client = client;
      this.users = await client.db(process.env.DB_NAMESPACE).collection('users');
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
    const user = await this.users.findOne({ email });
    console.log(user);
    if(!user) return null;
    user.hasListing = !!(await Listing.getListingsByUserId(user._id));
    return user;
  }

  /**
   * Adds a user to the `users` collection
   * @param {UserInfo} userInfo - The information of the user to add
   */
  static async addUser(userInfo) {
    const { email, passwordHash, isOfficial } = userInfo;
    try {
      
      const result = await this.users.insertOne({
        email,
        passwordHash,
        isOfficial
      }, { writeConcern: 'majority' });

      return await this.users.findOne(
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

    const session = this.client.startSession();

    const transactionOptions = {
      readPreference: 'primary',
      readConcern: { level: 'local' },
      writeConcern: { w: 'majority' }
    };

    await session.withTransaction(async () => {
      await Listing.deleteListing(user._id);
      await this.users.deleteOne({ email });
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
    const updateResponse = this.users.updateOne(
      { email },
      { $set: { isOfficial: true } },
    );
    return updateResponse;
  }

  static async getEmailForId(id) {
    const { email } = await this.users.findOne({ _id: id });
    return email;
  }
}

/**
 * Parameter passed to addUser method
 * @typedef UserInfo
 * @property {string} email
 * @property {string} passwordHash
 * @property {boolean} isOfficial
 */

module.exports = User;
