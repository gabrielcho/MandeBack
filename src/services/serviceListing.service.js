
const db = require('../db');

const getAllservices = async (req, res, next) => {
    try {
        const response = await pool.query("SELECT * FROM service_listing WHERE available_service_listing = 1");
        res.json(response.rows);
    }
    catch (err) {
        next(err);
    }
}



module.exports = {getAllservices};