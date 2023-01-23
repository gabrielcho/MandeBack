const express = require('express');
const routes = require('./routes/v1');
const app = express();
const bodyParser = require('body-parser')
const db = require('./db');
const session = require('express-session')
const bcrypt = require('bcrypt')


const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

app.use(session({
    secret: 'nonprod-test',
//    resave: false,
//    saveUninitialized: true,
//    cookie: { secure: true }
  }))




  
app.use(passport.initialize());
app.use(passport.session());

//Todo: Serialize
passport.serializeUser(function(user, done) {
    console.log('Serialize being called')
    done(null, user.id_worker);
});

    //ToDo: Deserialize
passport.deserializeUser(function(id, done) {
    console.log('Deserialize being called')
    db.one('SELECT * FROM worker WHERE id_worker = $1', [id])
        .then(user => done(null, user.id_worker))
        .catch(error => done(error, null));
});
        

passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback:true
}, 
    async function(req, email, password, done) {
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const { names, lastNames, address, phone, cc} = req.body
        const workerExists = await db.one(
            `SELECT EXISTS 
                (SELECT 1 FROM worker WHERE cc_worker = $1 OR email_worker = $2 OR phone_worker = $3);`
                ,[cc, email, phone]);
        console.log(workerExists)
        
        if(!workerExists.exists){
            db.one(
                `INSERT INTO worker 
                (email_worker, cc_worker, names_worker, lastnames_worker,  phone_worker, address_worker, available_worker, password_worker)
                 VALUES ($1, $2, $3, $4, $5, $6, TRUE, $7) RETURNING *;`,
                [email, cc, names, lastNames, phone, address, hashedPassword])
                .then(worker => {return done(null, worker)})    
                .catch(error => {return done(error)});
            
        }
        else{
            return done(null, false, {message: workerExists})
        }

    }
  ));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    db.oneOrNone(`SELECT * FROM worker WHERE email_worker = $1`,[email])
        .then(user => {
            if(!user) {
                return done(null, false, {message: 'Incorrect e-mail'})
            }
            if(!bcrypt.compareSync(password, user.password_worker)){
                return done(null, false, {message: 'Wrong password'})

            }
            console.log('fine')
            return done(null, user)
        })
        .catch(error => {return done(error)})
    

  }
));





app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/v1', routes);

app.listen(3000, () => {
    console.log('LISTENING')
})