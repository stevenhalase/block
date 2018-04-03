const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const port = process.env.PORT || 3080;

// const uristring =
//   process.env.MONGODB_URI ||
//   'mongodb://stevenhalase:TIffany11..11..@themovingcompany-shard-00-00-d3ufd.mongodb.net:27017,themovingcompany-shard-00-01-d3ufd.mongodb.net:27017,themovingcompany-shard-00-02-d3ufd.mongodb.net:27017/test?ssl=true&replicaSet=TheMovingCompany-shard-0&authSource=admin'

// mongoose.connect(uristring, (error) => {
//   if (error) {
//       console.error(error);
//   } else {
//       console.log('Mongoose connected successfully')
//   }
// })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.header("Origin"));
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

// app.get('/api/v1/autocomplete', (req, res) => {
//     console.log(req.query.input);
//     if (req.query.input) {
//         let url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + req.query.input + '&key=AIzaSyA4y0FpgKkHMXvFNWMT_m_GuKUiW5uQIN8';
//         request.get(url, {}, (error, result) => {
//             if (error) { console.log(error) };
//             res.json(result);
//         })
//     }
// })

// let ContactUsLeadRoutes = require('./ContactUsLead/ContactUsLeadRoutes');
// app.use('/api/v1/contactuslead', ContactUsLeadRoutes);

app.use(express.static(__dirname + '/build'));

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port);
})