
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


module.exports = {
    createListing
}