const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = class UserService {
  static async create({ email, password }) {
    const existingUsername = await User.getUser(email);

    if (existingUsername) throw new Error('That email is already in use, please log in');

    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const user = await User.addUser({
      email,
      passwordHash,
    });

    return user;
  }

  static async signIn({ email, password = '' }) {
    try {
      const user = await User.getUser(email);

      if (!user) throw new Error('Invalid credentials');
      if (!bcrypt.compareSync(password, user.passwordHash))
        throw new Error('Invalid credentials');

      delete user.passwordHash;
      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      }); // TODO: change to something more reasonable

      return token;
    } catch (error) {
      error.status = 401;
      throw error;
    }
  }
};
