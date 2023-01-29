const {workerService} = require('../services');



exports.createListing = async (req, res) => {
    const listing = await workerService.createListing(req.body, req.user.id_worker);
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

exports.getContracts = async (req, res) => {
    const workerId = req.user.id_worker

    const contracts = await workerService.getContracts(workerId)
    res.status(200).json({ contracts: contracts })
    
}
