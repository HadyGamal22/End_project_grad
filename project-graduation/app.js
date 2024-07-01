const express = require('express');
const cors = require('cors');
const Stadium = require('./models/stadium.js')
const mongoose = require('mongoose');
require('dotenv').config()
const router = express.Router()
const stadiumRouter = require('./routes/stadium.route.js')
const userRouter = require('./routes/user.route.js')
const paypalRouter = require('./routes/paypal.js')
const paymobRouter = require('./routes/paymobRouter.js')
const timeRouter = require('./routes/time.route.js')
const httpStatusText = require('./utilz/httpStatusText')
const bookingRouter = require('./routes/booking.js')
const stripeRouter = require('./routes/stripe.routes.js')
const passport = require('passport')
const authRoute = require("./routes/auth");
const passportSetup=require("./passport.js")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require('cookie-session')
const path = require('path');
const session = require('express-session');
const app = express();
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const url = process.env.MONGO_URL;
// const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID');

mongoose.connect(url).then(() => {
    console.log("mongodb connected");
})

// app.use(
// 	cookieSession({
// 		maxAge: 30 * 24 * 60 * 60 * 1000,
// 		keys:  ["cyperwolv"],
// 	})
// );
// app.use(session({ secret: 'hello', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://localhost:5001/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     //   return done(err, user);
//     // });
//     return done(null, profile);
//   }));
  
//   passport.serializeUser((user, done) => {
//     done(null, user);
//   });
  
//   passport.deserializeUser((user, done) => {
//     done(null, user);
//   });
  
//   // Routes
//   app.get('/auth/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] })
//   );
  
//   app.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/' }),
//     function(req, res) {
//       res.redirect('http://localhost:3000'); // Redirect to the client side
//     }
//   );
  
//   app.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/');
//   });
// app.use(passport.initialize());
// app.use(passport.session());

// app.use('/auth', authRoute);

app.use('/api/stadium', stadiumRouter);
app.use('/api/users', userRouter);
app.use('/api/hour', timeRouter);
// app.use("/api/orders", paypalRouter);
// app.use('/paymob/payment', paymobRouter);
// app.use('/booking', bookingRouter);
// app.use('/stripe', stripeRouter);
// app.use("/auth", authRoute);

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: httpStatusText.ERROR || "error",
        message: error.message
    })
})
app.all('*', (req, res, next) => {

    res.status(404).json({
        status: httpStatusText.ERROR || "ERROR",
        message: {
            stadium: "NOT FOUND THhS RESOURCE "
        },
        code: 404,

    })
    next()
})
app.listen(process.env.PORT, () => {
    console.log("HELLO");
})