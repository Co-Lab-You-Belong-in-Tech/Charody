
module.exports = async (req, res, next) => {
  if (req.user.isOfficial) {
    next();
  } else {
    next({
      message: 'You must be an official to access this resource',
      status: 403
    });
  }
};
