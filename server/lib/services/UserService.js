const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { nanoid } = require('nanoid');
const { sendVerificationEmail } = require('./EmailService.js');

async function create({ email, password, isOfficial }) {
  const existingUsername = await User.getUser(email);

  if (existingUsername) throw new Error('That email is already in use, please log in');

  const passwordHash = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUNDS)
  );

  const userInfo = { email, passwordHash };
  if(isOfficial) {
    userInfo.verificationCode = nanoid();
  }

  const user = await User.addUser(userInfo);

  sendVerificationEmail(email, userInfo.verificationCode);

  return user;
}

async function signIn({ email, password = '' }) {
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

module.exports = {
  create,
  signIn
};
