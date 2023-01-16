const {workerService} = require('../services')



exports.postListing = (req, res) => {
    console.log(req.body)
    res.send(req.body)
}

