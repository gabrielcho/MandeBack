const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    console.log(req.user)
    console.log('not authenticated')
    res.send({message: 'Not logged in'});
  };
  
module.exports = ensureAuthenticated;