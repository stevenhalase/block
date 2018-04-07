const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const port = process.env.PORT || 3080;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.header("Origin"));
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});


app.use(express.static(__dirname + '/build'));

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port);
})