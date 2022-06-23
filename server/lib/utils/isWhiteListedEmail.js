let allowedEmails;
let allowedDomains;
let didParseFail;

try {
  allowedEmails = JSON.parse(process.env.ALLOWED_EMAILS);
  allowedDomains = JSON.parse(process.env.ALLOWED_DOMAINS);
  didParseFail = false;
} catch(e) {
  didParseFail = true;
  console.log(e);
}

/**
 * Returns true if the email is whitelisted to be an official
 * @param {string} email - the email address to check
 * @returns {boolean}
 */
function isWhiteListedEmail(email) {
  if(didParseFail) throw new Error('Failed to load email whitelist.');
  const e = email.toLowerCase();
  console.log(e, allowedEmails, allowedDomains);
  return allowedEmails.includes(e) || allowedDomains.includes(e.split('@')[1]);
}

module.exports = isWhiteListedEmail;
