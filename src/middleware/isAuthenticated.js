const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send({message: 'Not logged in'});
};

module.exports = ensureAuthenticated;