const {workerService} = require('../services')



exports.createListing = async (req, res) => {
    const listing = await workerService.createListing(req.body)
    res.send(listing)
}

