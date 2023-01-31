
const db = require('../db');

const getServiceListings = async () => {
    try {
        const response = await db.manyOrNone("SELECT * FROM service_listing WHERE available_service_listing = True");
        return response;
    }
    catch (err) {
        return err;
    }
}



module.exports = {getServiceListings};