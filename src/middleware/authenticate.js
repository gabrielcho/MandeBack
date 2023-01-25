const passport = require('passport')


const workerRegister = (strategy) => (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
        if (err) { return next(err)}
        if (user) {req.user = user;
            next();
        }
        else {return res.status(401).json({message: info.message})}
    })(req, res, next)
    
}

module.exports = workerRegister;