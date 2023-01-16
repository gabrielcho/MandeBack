-- Create schemas

-- Create tables
CREATE TABLE IF NOT EXISTS worker
(
    id_worker SERIAL,
    email_worker VARCHAR(255) NOT NULL UNIQUE,
    cc_worker VARCHAR(255) NOT NULL UNIQUE,
    names_worker VARCHAR(255) NOT NULL,
    lastnames_worker VARCHAR(255) NOT NULL,
    address_worker point NOT NULL,
    picture_worker VARCHAR(255),
    phone_worker VARCHAR(255),
    available_worker BOOLEAN,
    password_worker VARCHAR(255),
    PRIMARY KEY(id_worker)
);

CREATE TABLE IF NOT EXISTS client
(
    id_client SERIAL,
    cc_client VARCHAR(255) NOT NULL UNIQUE,
    email_client VARCHAR(255) NOT NULL UNIQUE,
    address_client point NOT NULL,
    names_client VARCHAR(255) NOT NULL,
    lastnames_client VARCHAR(255) NOT NULL,
    phone_client VARCHAR(255) NOT NULL,
    creditcard_client VARCHAR(255) NOT NULL,
    PRIMARY KEY(id_client)
);

CREATE TABLE IF NOT EXISTS service
(
    id_service SERIAL,
    name_service VARCHAR(255),
    description_service VARCHAR(255),
    PRIMARY KEY(id_service)
);

CREATE TABLE IF NOT EXISTS service_listing
(
    id_service_listing SERIAL,
    worker_id_worker INTEGER,
    service_id_service INTEGER,
    rating_service_listing DECIMAL(1, 1),
    available_service_listing BOOLEAN,
    price_service_listing INTEGER,
    unit_service_listing VARCHAR(255),
    title_service_listing VARCHAR(255),
    description_service_listing VARCHAR(255),
    PRIMARY KEY(id_service_listing)
);

CREATE TABLE IF NOT EXISTS contract
(
    id_contract SERIAL,
    service_listing_id_service_listing INTEGER,
    client_id_client INTEGER,
    completed_contract BOOLEAN,
    units_contract INTEGER,
    rating_contract INTEGER CHECK (rating_contract between 0 and 5),
    PRIMARY KEY(id_contract)
);


-- Create FKs
ALTER TABLE contract
    ADD    FOREIGN KEY (client_id_client)
    REFERENCES client(id_client)
    MATCH SIMPLE
;
    
ALTER TABLE contract
    ADD    FOREIGN KEY (service_listing_id_service_listing)
    REFERENCES service_listing(id_service_listing)
    MATCH SIMPLE
;
    
ALTER TABLE service_listing
    ADD    FOREIGN KEY (worker_id_worker)
    REFERENCES worker(id_worker)
    MATCH SIMPLE
;
    
ALTER TABLE service_listing
    ADD    FOREIGN KEY (worker_id_worker)
    REFERENCES worker(id_worker)
    MATCH SIMPLE
;
    
ALTER TABLE service_listing
    ADD    FOREIGN KEY (service_id_service)
    REFERENCES service(id_service)
    MATCH SIMPLE
;
    
ALTER TABLE contract
    ADD    FOREIGN KEY (service_listing_id_service_listing)
    REFERENCES service_listing(id_service_listing)
    MATCH SIMPLE
;
    

-- Create Indexes

