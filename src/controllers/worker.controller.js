const {workerService} = require('../services');

exports.createWorker = async (req, res) => {
    const worker = await workerService.createWorker(req.body);
    res.send(worker);
}

exports.createListing = async (req, res) => {
    const listing = await workerService.createListing(req.body, req.user);
    if (listing){
        res.send(listing)
    }
    else{
        res.status(400).send({message: 'This type of listing already exists'})
    }
}

exports.logoutWorker = async (req, res) => {
    req.logout();
    res.redirect('/');
}

