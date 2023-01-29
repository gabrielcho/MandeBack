
const db = require('../db');

const createListing = async (listingBody, workerId) => {
    //checks if there is not an existing listing for that user and service
    const {serviceId, unit, price, title, description} = listingBody;
    try {
        const listingExists = await db.one(`SELECT EXISTS (SELECT 1 FROM service_listing WHERE worker_id_worker= $1 AND service_id_service= $2);`,[workerId, serviceId]);
        if (!listingExists.exists){
            const result = await db.one(
                `INSERT INTO service_listing 
                    (   worker_id_worker, 
                        service_id_service, 
                        rating_service_listing,
                        available_service_listing,
                        price_service_listing,
                        unit_service_listing,
                        title_service_listing,  
                        description_service_listing 
                    ) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
                    RETURNING *;`,
                [workerId, serviceId, 0, true , price, unit,title, description]);
            return result 
        }
        else {
            return null
        }     
    }
    catch {
        return {message: "Database error." }
    }
}

const getContracts = async (workerId) => {
    const contracts = await db.manyOrNone(
        `SELECT cl.names_client, cl.lastnames_client, sl.id_service_listing, sl.title_service_listing,
                sl.description_service_listing, sl.unit_service_listing, sl.rating_service_listing,
                sl.price_service_listing, s.name_service, c.completed_contract, c.units_contract,
                c.rating_contract, c.id_contract
        FROM contract c
        JOIN service_listing sl ON c.service_listing_id_service_listing = sl.id_service_listing
        JOIN client cl ON c.client_id_client = cl.id_client
        JOIN service s ON sl.service_id_service = s.id_service
        WHERE sl.worker_id_worker = $1;
        `, [workerId])

    return contracts;
}


module.exports = {
    createListing,
    getContracts
}