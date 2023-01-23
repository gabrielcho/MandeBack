const express = require('express');
const routes = require('./routes/v1');
const app = express();
const bodyParser = require('body-parser')

const initializePassport = require("./validations/passportConfg");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/v1', routes);

initializePassport(passport);
// 
// Parses details from a form
app.use(express.urlencoded({ extended: false }));

//
app.use(
    session({
      // Key we want to keep secret which will encrypt all of our information
      secret: "mandeSecret",
      // Should we resave our session variables if nothing has changes which we dont
      resave: false,
      // Save empty value if there is no value which we do not want to do
      saveUninitialized: false
    })
);
// Funtion inside passport which initializes passport
app.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
app.use(passport.session());

// endpoints del login
app.post(
    "/v1/users/login",
    passport.authenticate("local", {
      successRedirect: "/users/dashboard",
      failureRedirect: "/users/login",
      failureFlash: true
    })
);

app.get("/v1/users/login", (req, res) => {
    // flash sets a messages variable. passport sets the error message
    // it uses express flash to show messages
    console.log(req.session.flash.error);
    res.render("");
});

app.get("/v1/users/dashboard", (req, res) => {
    console.log(req.isAuthenticated());
    res.render("", { user: req.user.name });
});

app.listen(3000, () => {
    console.log('LISTENING')
})