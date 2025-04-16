const express = require('express');
const router = require('../src/routes/ai.route');
const app = express();
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

// Enable trust proxy (important when using secure cookies behind a proxy like Render)
app.set("trust proxy", 1);

// Middleware
app.use(express.json());

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://askify-5sci.onrender.com',
  process.env.Front_URL
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Session Configuration
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false, // use true in production with HTTPS
    sameSite: "lax" // more compatible than 'none' on localhost
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.Back_URL}/auth/google/callback`,
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

// Serialize/Deserialize
passport.serializeUser((user, done) => {
  // console.log("Serializing user:", user.id);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // console.log("Deserializing user:", user.id);
  done(null, user);
});

// OAuth Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: process.env.Front_URL
  }),
  (req, res) => {
    res.redirect(`${process.env.Front_URL}/dashboard`);
  }
);

// Home
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// Protected User Route
app.get('/auth/user', (req, res) => {
  // console.log("Session:", req.session);
  console.log("User:", req.user);
  // console.log("isAuthenticated:", req.isAuthenticated());

  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Logout Route
app.get('/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });

    req.session.destroy(() => {
      res.clearCookie("connect.sid", { path: "/" });
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

// Custom Routes
app.use('/ai', router);

// Export app
module.exports = app;


