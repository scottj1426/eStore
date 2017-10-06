// Bring in our required modules
const express = require('express');
const { json } = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
conncetionString = 'postgres://JamesScott@localhost/JamesScott';

//require config here
const { secret } = require('./config').session;
// const { dbUser, database } = require('./config').db;
// const { domain, clientID, clientSecret } = require('../config').auth0;


//port
const port = 3000;

//database connection information

//app declaration
const app = express();

//use middlewares
app.use(json());
app.use(cors());
app.use('/', express.static(__dirname + '/public'));
massive(conncetionString).then(db => {
    app.set('db', db);
  });


  app.get('/api/products', (req, res) => {
    req.app
      .get('db')
      .getProducts()
      .then(products => res.json(products));
  });


  app.post('/api/cart', (req, res) => {
    req.app
      .get('db')
      .addToCart([req.body.product.name, req.body.product.price])
      .then(products => res.json("SUCCESS"));
  });

  app.get('/api/cart', (req, res) => {
    req.app
      .get('db')
      .getCart()
      .then(products => res.json(products));
  });

//use express
app.use(session({
    secret,
    resave: true,
    saveUninitialized: true
}));

//passport setup
app.use(passport.initialize());
app.use(passport.session());


//uses passort to acces auth0


//pull user from session for manipulation


//database endpoints

//inital endpoint to fire off login 

//redirect to home to use resolve to catch the user


//if not logged in, send error message and catch in resolve, else send user

//remove user from session

//port listener
app.listen(port, ()=> {
    console.log(`LISTENING ON PORT: ${port}`);
});




