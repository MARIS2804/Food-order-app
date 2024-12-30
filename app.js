// app.js
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');
const path = require('path');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/food_reservation');

// Set up sessions
app.use(session({
    secret: 'your_secret_key', // Keep this secret in production
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/food_reservation' })
}));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ensure views are in the correct folder
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Routes
app.use('/auth', authRoutes);
app.use(indexRoutes); // Main routes

app.listen(3002, () => {
    console.log('Server is running on http://localhost:3002');
});
