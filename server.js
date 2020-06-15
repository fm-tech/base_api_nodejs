// server.js
// BASE SETUP
// =============================================================================
// call the packages we need
const express = require('express')        // call express
const app = express()                 // define our app using expressmk
const mongoose = require('mongoose')
const cors = require('cors')          // Corss origin enabling 
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport');

const config = require('./config')

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: 'secret', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(require('sanitize').middleware);


// Enables cross domain request, restrict for production use  
app.use(cors({
  origin: [],
  credentials: true
    
}))

// Connect Passport and initialize it 
require('./modules/passport')
app.use(passport.initialize());
app.use(passport.session());


var indexRoutes = require('./routes')
var usersRoutes = require('./routes/users')


var port = process.env.PORT || 9090;        // set our port

// Database setup
mongoose.connect(config.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }); //No password used to keep this example short
//  Aloows to recieve promise data
//  mongoose.Promise = global.Promise;

// DB variable
var db = mongoose.connection;
// DB troubleshooting console logs 
db.on('error', console.error.bind(console, 'Connection error'));
db.on('open', function (callback) {
    console.log('Connected to database.');
});

// ROUTES FOR OUR API
// =============================================================================
app.use('/api', indexRoutes)
app.use('/api/users', usersRoutes)


  // START THE SERVER
    // =============================================================================
    app.listen(port);
    console.log('Magic happens on port ' + port);