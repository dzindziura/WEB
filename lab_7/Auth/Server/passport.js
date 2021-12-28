//прописуємо логіку автентифікації користувача
const passport = require('passport');
const ChatUser = require('./chatuser');

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  async function(username, password, done) {
    let newUser

    try {
      const user = await ChatUser.findOne({username});
      if (user) {
        if (user.password === password) {
          newUser = user;
        } else {
          return done(null, false);
        }
      } else {
        newUser = await ChatUser.create({username, password});
      }

      return done(null, {id:newUser._id, username:newUser.username});
    } catch (error) {
      return done(error)
    }
  }));

passport.serializeUser((userData, done) => {
  console.log("serialize user:", userData);
  done(null, userData);
});

passport.deserializeUser(function(userData, done){
  console.log("deserialize user:", userData);

  ChatUser.findById(userData.id, (err, data) => {
    if (err) { return done(err); }

    if (data) {
      done(null, {username: data.username});
    }
  });
});

module.exports = passport;
