const express = require('express');
const routes = require('./routes/v1');
const app = express();
const bodyParser = require('body-parser')
const db = require('./db');
const session = require('express-session')
const bcrypt = require('bcrypt')
const cors = require('cors')

const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;



app.use(cors());

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(session({
    secret: 'nonprod-test',
    //    resave: false,
    //    saveUninitialized: true,
    //    cookie: { secure: true }
}))

/*
const key = {
    id: user.id_worker ? user.id_worker : user.id_client,
    type: user.id_worker ? 'worker' : 'client'
}*/


app.use(passport.initialize());
app.use(passport.session());

//Todo: Serialize
passport.serializeUser(function (user, done) {
    done(null, user);
});

//ToDo: Deserialize     
passport.deserializeUser(async function (user, done) {

    const {id_worker, id_client} = user;
    const table = id_worker ? 'worker' : id_client ? 'client' :  null;
    const id = id_worker ? 'id_worker' : id_client ? 'id_client' : null;
    try{
        const result = await db.oneOrNone(`SELECT * FROM ${table} WHERE ${id} = $1`, [id_worker || id_client]);
        done(null, result)
    }
    catch (error){
        done(error, null);
    }
});


passport.use('local-register-worker', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    async function (req, email, password, done) {
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const { names, lastNames, address, phone, cc } = req.body
        const workerExists = await db.one(
            `SELECT EXISTS 
                (SELECT 1 FROM worker WHERE cc_worker = $1 OR email_worker = $2 OR phone_worker = $3);`
            , [cc, email, phone]);

        if (!workerExists.exists) {
            db.one(
                `INSERT INTO worker 
                (email_worker, cc_worker, names_worker, lastnames_worker,  phone_worker, address_worker, available_worker, password_worker)
                 VALUES ($1, $2, $3, $4, $5, $6, TRUE, $7) RETURNING id_worker;`,
                [email, cc, names, lastNames, phone, address, hashedPassword])
                .then(worker => { return done(null, worker, {message: 'Successfully registered'}) })
                .catch(error => { return done(error) });

        }
        else {
            done(null, false, { message: 'Worker account already exists' })
        }

    }
));

passport.use('local-login-worker', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (email, password, done) {
        db.oneOrNone(`SELECT * FROM worker WHERE email_worker = $1`, [email])
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'Incorrect e-mail' })
                }
                if (!bcrypt.compareSync(password, user.password_worker)) {
                    return done(null, false, { message: 'Wrong password' })

                }
                return done(null, user)
            })
            .catch(error => { return done(error) })


    }
));

passport.use('local-register-client', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    async function (req, email, password, done) {
        const { names, lastNames, address, phone, cc, creditCard } = req.body;
        const hashedPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const clientExists = await db.one(
            `SELECT EXISTS 
                (SELECT 1 FROM client WHERE cc_client = $1 OR email_client = $2 OR phone_client = $3);`
            , [cc, email, phone]);

        if (!clientExists.exists) {
            db.one(
                `INSERT INTO client (names_client, lastnames_client, address_client, phone_client, cc_client, email_client, password_client, creditcard_client)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id_client, password_client`
                , [names, lastNames, address, phone, cc, email, hashedPassword, creditCard])
                .then(user => { return done(null, user) })
                .catch(error => { return done(error) })
        }

        else {
            return done(null, false, { message: 'User already exists or unique fields already exist in other user information' })
        }
    }

)
);

passport.use('local-login-client',
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      function (email, password, done) {
            db.oneOrNone(`SELECT * FROM client WHERE email_client = $1`, [email])
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'Incorrect e-mail' })
                }
                if (!bcrypt.compareSync(password, user.password_client)) {
                    return done(null, false, { message: 'Wrong password' })

                }
                return done(null, user, {message: 'Successful login'})
            })
            .catch(error => { return done(error)})

    }
    )
  );








app.use('/v1', routes);

app.listen(3000, () => {
    console.log('LISTENING')
})