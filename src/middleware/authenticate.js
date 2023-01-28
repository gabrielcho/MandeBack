const passport = require('passport')


const authenticateRegister = (strategy) => (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
        if (err) { return next(err)}
        if (user) {return  res.status(200).json({message: 'Successssfully registered'});
        }
        else {return res.status(401).json({message: info.message})}
    })(req, res, next)
    
}

const authenticateLogin = (strategy) => (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {

        if (err) { return next(err)}
        if (user) {
            const {id_worker, id_client} = user;
            const userId = id_worker ? {id_worker: user.id_worker} : id_client ? {id_client: user.id_client} :  null;
            req.user = userId;
            req.logIn(userId, (err) => {
                res.status(200).json({message: 'Succesfully logged in'})
            })
        }
        else {return res.status(401).json({message: info.message})}
    })(req, res, next)
    
}

module.exports = {authenticateRegister, authenticateLogin};