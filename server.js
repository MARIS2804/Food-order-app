// server.js

const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
const uri = 'mongodb://localhost:27017';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB and fetch food data
const getFoodData = async () => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db('food_reservation');
        const collection = database.collection('reservations');
        return await collection.find().toArray();
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
};

// Render the food menu page
app.get('/', async (req, res) => {
    const foods = await getFoodData();
    res.render('index', { foods });
});
// Serve the login page at the correct route
app.get('/login', (req, res) => {
    res.render('login');
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
