// Bring in our required modules
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
//  conncetionString = 'postgres://JamesScott@localhost/JamesScott'; 
//  const keys = require('./config/keys');
// const stripe = require('stripe')(keys.stripeSecretKey);

//require config here
const { secret } = require('./config').session;
 const {stripeSecretKey} = require('./config').keys;
const stripe = require('stripe')(stripeSecretKey);
const { dbUser, database } = require('./config').db;
const { domain, clientID, clientSecret } = require('./config').auth0;
const config = require('./config');

//port
const port = 3000;



//app declaration
const app = express();

//use middlewares


// app.use(json());
app.use(cors());
app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));

// //Index Route
// app.get('/', (req, res) => {
//   res.render('/Cart', {
//     stripePublishableKey: keys.stripePublishableKey
//   });
// });

// Index Route
app.get('/', (req, res) => {
  res.render('index', {
    stripePublishableKey: keys.stripePublishableKey
  });
});

// Charge Route
app.post('/api/payment', (req, res) => {
  // console.log(req.body);
  const amount = Math.round(req.body.total,4);
  
  const { id, email } = req.body.token;
  const cardId = req.body.token.card.id;
  
  stripe.customers.create({
    email,
    source: id
  })
  .then(customer => stripe.charges.create({
    amount,
    description: 'Jimmy\'s Reptiles',
    currency: 'usd',
    customer: customer.id,
    card: cardId
  }))
  .then(charge => res.json({message: 'Successful Message'}));
});






massive(config.db.conncetionString).then(db => {
    app.set('db', db);
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



//<---- Use Passport to access Auth0 ----->
passport.use(new Auth0Strategy({
  domain,
  clientID,
  clientSecret,
  callbackURL:  '/auth/callback'
 }, (accessToken, refreshToken, extraParams, profile, done) => {
   //Find user in database
  //  console.log(profile.id);
   
   const db = app.get('db');
   // .then means this is a promise
   db.getUserByAuthId([profile._json.sub]).then((user, err) => {
      //  console.log('INITIAL: ', user);
     if (!user[0]) { //if there isn’t a user, we’ll create one!
      //  console.log('CREATING USER');
       db.createUserByAuth([profile._json.sub]).then((user, err) => {
        //  console.log('USER CREATED', user[0]);
         return done(err, user[0]); // GOES TO SERIALIZE USER
       })
     } else { //when we find the user, return it
      //  console.log('FOUND USER', user[0]);
       return done(err, user[0]);
     }
   });
 }
));

// put user on session
passport.serializeUser((user, done) => {
  done(null, user);
});

// pull user from session for manipulation
passport.deserializeUser((user, done) => {
  // console.log(user);
  done(null, user);
});

  // general endpoints
  app.get('/api/products', (req, res) => {
    req.app
      .get('db')
      .getProducts()
      .then(products => res.json(products));
  });

  app.get('/api/products/:id', (req, res) => {
    req.app
      .get('db')
      .getItem(req.params.id)
      .then(products => res.json(products));
  });

  app.post('/api/cart', (req, res) => {
    console.log("inde.js", req.body)
    const { name, price, quantity, image} = req.body.product;
    const authid = req.session.passport.user.authid;
    console.log(name, price, quantity)
    req.app
      .get('db')
      .addToCart([name, price, quantity, image,authid])
      .then(products => res.json(products));
  
  });

  app.post('/api/item', (req, res) => {
    console.log("inde.js", req.body)
    const { name, price, quantity, image} = req.body;
    const authid = req.session.passport.user.authid;
    console.log(name, price, quantity)
    req.app
      .get('db')
      .addToCart([name, price, quantity, image,authid])
      .then(products => res.json(products));
  
  });


  app.get('/api/cart', (req, res) => {
    req.app
      .get('db')
      .getCart()
      .then(products => res.json(products));
  });
  

  app.delete('/api/cart/:id', (req, res) => {
    req.app
      .get('db')
      .deleteFromCart([req.params.id])
      .then(products => res.json(products));
  });


  app.delete('/api/cart', (req, res) => {
    req.app
      .get('db')
      .clearCart()
      .then(products => res.json(products));
  });

  app.get('/api/cart', (req, res) => {
    req.app
      .get('db')
      .getCart()
      .then(products => {
        res.json(products)
      });
  });


  app.put('/api/cart', (req, res) => {
    let items = req.body
    // console.log("update cart body:", items)

    const promise = items.map(item => {
      // console.log("each item:", item)
      const response = []
      response.push( req.app.get( 'db' ).updateCart([ item.quantity, item.id ]) )                  
      // console.log("response array:", response)
    }); 

    Promise.all(promise)
        .then( items => {
          // console.log("promise all", items)
    })
  });

  app.post('/api/orders', async (req, res) => {
    // const { name, price, quantity, image} = req.body.product;
    console.log(req.body);
    const authid = req.session.passport.user.authid;
    for (let i = 0; i < req.body.length; i++) {
      let curr = req.body[i];
      await req.app
        .get('db')
        .cartToOrders([curr.name, curr.price, curr.quantity, curr.image, authid,new Date()])
    }
    res.json({message: 'Successfully Inserted'});
  
  });

  app.get('/api/orders/', (req, res) => {
    const authid = req.session.passport.user.authid;
    req.app
      .get('db')
      .getOrders(authid)
      .then(orders => {
        res.json(orders)
      });
  });



  // auth endpoints

// initial endpoint to fire off login
app.get('/auth', passport.authenticate('auth0', {scope: 'openid profile'}));

// redirect to home and use the resolve to catch the user
app.get('/auth/callback',
    passport.authenticate('auth0', { successRedirect: '/' , failureRedirect: '/login' }), (req, res) => {
        res.status(200).json(req.user);
});

// if not logged in, send error message and catch in resolve
// else send user
app.get('/auth/me', (req, res) => {
    if (!req.user) return res.status(401).json({err: 'User Not Authenticated'});
    res.status(200).json(req.user);
});

// remove user from session
app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});




//port listener
app.listen(port, ()=> {
    console.log(`LISTENING ON PORT: ${port}`);
});

// connect cart to users 
// on order sumbit, extrct user info from cart, pass to order table
// destroy references to specific user on cart table 
//just get user orders by auth id 



