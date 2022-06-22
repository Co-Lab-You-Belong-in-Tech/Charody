const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserDAO = require('../DAOs/UserDAO');
const { nanoid } = require('nanoid');
const { sendVerificationEmail } = require('./EmailService.js');
const isWhiteListedEmail = require('../utils/isWhiteListedEmail.js');
const isAdminEmail = require('../utils/isAdminEmail.js');

async function create({ email, password, isOfficial }) {
  const existingUsername = await UserDAO.getUser(email);

  if (existingUsername) throw new Error('That email is already in use, please log in');

  const passwordHash = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUNDS)
  );

  const userInfo = { email, passwordHash };
  if(isOfficial) {
    if(!isWhiteListedEmail(email)) throw new Error('This email is not allowed to sign up as an official.');
    userInfo.verificationCode = nanoid();
    sendVerificationEmail(email, userInfo.verificationCode);
  } else {
    userInfo.isHomeowner = true;
  }

  const user = await UserDAO.addUser(userInfo);

  return user;
}

async function signIn({ email, password = '' }) {
  try {
    const user = await UserDAO.getUser(email);

    if (!user) throw new Error('Invalid credentials');
    if (user.verificationCode) throw new Error('Account not verified. Please check your email.');
    if (!bcrypt.compareSync(password, user.passwordHash))
      throw new Error('Invalid credentials');

    delete user.passwordHash;
    delete user.verificationCode;
    user.isAdmin = isAdminEmail(user.email);
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
