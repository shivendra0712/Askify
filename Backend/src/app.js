const express = require('express');
const router = require('../src/routes/ai.route')
const app = express();
const cors = require('cors')
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const session = require('express-session')

app.use(express.json());

app.use(cors({
  origin: "https://askify-5sci.onrender.com/",
  methods: "GET,POST,PUT,DELETE", 
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport to use Google OAuth 2.0 strategy

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://askify-backend-l0fk.onrender.com/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  // Here, you would typically find or create a user in your database
  // For this example, we'll just return the profile
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Route to initiate Google OAuth flow
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);


app.get("/auth/google/callback",
  passport.authenticate("google", {
      successRedirect: "https://askify-5sci.onrender.com/dashboard",
      failureRedirect: "https://askify-5sci.onrender.com/"
  }),
  (req, res) => {
      res.redirect(`http://localhost:5173/dashboard?user=${encodeURIComponent(JSON.stringify(req.user))}`);
  }
);


app.get('/',(req,res)=>{
     res.send('hello world')
})

app.get("/auth/user", (req, res) => {
  if (req.isAuthenticated()) {
      res.json(req.user);
  } else {
      res.status(401).json({ message: "Unauthorized" });
  }
});

app.get("/auth/logout", (req, res) => {
  req.logout((err) => {
      if (err) return res.status(500).send("Logout failed");

      req.session.destroy(() => {
          res.clearCookie("connect.sid", { path: "/" });  // ✅ Clear session cookie
          return res.status(200).json({ message: "Logged out successfully" });  // ✅ Send JSON response
      });
  });
});

app.use('/ai',router);

module.exports = app;