const express = require('express');
const routes = require('./routes/v1');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/v1', routes);

app.listen(3000, () => {
    console.log('LISTENING')
})