const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    console.log('not authenticated')
    res.redirect('/login');
  };
  
module.exports = ensureAuthenticated;