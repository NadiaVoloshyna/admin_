const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async ({ _id }, done) => {
  try {
    const user = await User.findById(_id);

    if (user) {
      done(null, user);
    }
  } catch (error) {
    console.error(error);
    done(error);
  }
});

passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const currentUser = await User.findOne({ 'google.id': profile.id });
      if (currentUser) {
        done(null, currentUser.toJson());
      } else {
        done(
          `Unfortunatelly you don\'t have access to this site. 
          If you beleave you should have access contact your administrator.`
        );
      }
    } catch (error) {
      done('Something unexpected has happened');
    }
  })
)

async function verifyPassword (userPassword, password) {
  return await bcrypt.compare(password, userPassword);
}

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const currentUser = await User.findOne({ email, active: true });

      if (currentUser && await verifyPassword(currentUser.password, password)) {
        done(null, currentUser.toJSON());
      } else {
        done(
          `Unfortunatelly you don\'t have access to this site. 
          If you beleave you should have access contact your administrator.`
        );
      }
    } catch (error) {
      done('Something unexpected has happened');
    }
  }
));