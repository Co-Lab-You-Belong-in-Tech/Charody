let adminEmails;
let didParseFail;

try {
  adminEmails = JSON.parse(process.env.ADMIN_EMAILS);
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
function isAdminEmail(email) {
  if(didParseFail) throw new Error('Failed to load admin email list.');
  const e = email.toLowerCase();
  console.log(e, adminEmails);
  return adminEmails.includes(e);
}

module.exports = isAdminEmail;
