// server file : contains all the routes and ,
//               connection to the database

const express = require('express');
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname+'/views');   // setting the views

const bodyParser = require('body-parser');
// using the body-parser for the full app
// all the POST request data will be stored in req.body
app.use(bodyParser.urlencoded({extended: false}));  

// DATABASE CONNECTION; name of Database : musicdb
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/musicdb", {
    useNewUrlParser : true,
    useUnifiedTopology : true
});
mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB !!");
}).on('error', (err) => {
    console.log("Connection Error"+err);
});

// ROUTES
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const artistRouter = require('./routes/artist');
app.use('/artists', artistRouter);

const albumRouter = require('./routes/album');
app.use('/albums', albumRouter);

// SERVER LISTENING ON PORT 3000 AT http://localhost:3000
app.listen(3000); 
console.log("Server running on Port 3000");
console.log("URL : http://localhost:3000");