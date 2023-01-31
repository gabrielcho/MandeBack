
const { getServiceListings } = require('../services/serviceListing.service');

exports.getServiceListings = async(req, res) => {
    const serviceListings = await getServiceListings();

    res.status(200).json({serviceListings: serviceListings})
}
