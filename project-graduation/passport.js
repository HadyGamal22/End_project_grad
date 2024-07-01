// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const passport = require("passport");
// const mongoose = require("mongoose");
// const User = require("./models/user.model"); // Make sure the path is correct

// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: process.env.CLIENT_ID,
//             clientSecret: process.env.CLIENT_SECRET,
//             callbackURL: "http://localhost:5001/auth/google/callback",
//             scope: ["profile", "email"],
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 let user = await User.findOne({ googleId: profile.id });

//                 if (user) {
//                     // If user exists, log them in
//                     return done(null, user);
//                 } else {
//                     // If user doesn't exist, create a new user
//                     user = new User({
//                         googleId: profile.id,
//                         firstName: profile.name.givenName,
//                         lastName: profile.name.familyName,
//                         email: profile.emails[0].value,
//                     });
//                     await user.save();
//                     done(null, user);
//                 }
//             } catch (err) {
//                 done(err, false, err.message);
//             }
//         }
//     )
// );

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);
//         done(null, user);
//     } catch (err) {
//         done(err, null);
//     }
// });
