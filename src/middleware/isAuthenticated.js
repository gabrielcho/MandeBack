const ensureAuthenticated = (userType) => {
  return (req, res, next) => {

    if (req.isAuthenticated()) {
      if (userType === 'worker' && req.user.id_worker) {
        next()
      }
      else if (userType === 'client' && req.user.id_client) {
        next()
      }

      else {
        return res.status(401).json({ message: 'This user type has no access to this endpoint' })
      }
    }

    else {
      return res.status(401).json({ message: 'Not logged in' })
    }
  }
};

module.exports = ensureAuthenticated;