const { MongoClient } = require('mongodb');

// MongoDB connection URI (change if necessary)
const uri = 'mongodb://localhost:27017';

// Sample food dataset
const foodData = [
  {
    "name": "Margherita Pizza",
    "description": "Classic pizza topped with mozzarella cheese and tomato sauce.",
    "category": "Pizza",
    "price": 8.99,
    "available": true,
    "image_url": "https://images.unsplash.com/photo-1585238342029-2a2877a4a84b"
  },
  {
    "name": "Cheeseburger",
    "description": "Juicy beef patty topped with cheese, lettuce, tomato, and pickles.",
    "category": "Burger",
    "price": 6.49,
    "available": true,
    "image_url": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
  },
  {
    "name": "Caesar Salad",
    "description": "Fresh romaine lettuce with Caesar dressing, croutons, and Parmesan cheese.",
    "category": "Salad",
    "price": 5.99,
    "available": true,
    "image_url": "https://images.unsplash.com/photo-1559628238-b9b7c8f6446d"
  },
  {
    "name": "Spaghetti Carbonara",
    "description": "Creamy pasta with bacon, eggs, Parmesan, and black pepper.",
    "category": "Pasta",
    "price": 9.49,
    "available": true,
    "image_url": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90"
  },
  {
    "name": "Sushi Platter",
    "description": "Assorted sushi rolls with fresh fish, avocado, and rice.",
    "category": "Sushi",
    "price": 12.99,
    "available": true,
    "image_url": "https://images.unsplash.com/photo-1546069901-eacef0df6022"
  },
  {
    "name": "Chicken Tacos",
    "description": "Soft tortillas filled with grilled chicken, lettuce, and salsa.",
    "category": "Mexican",
    "price": 7.99,
    "available": true,
    "image_url": "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85"
  },
  {
    "name": "Pad Thai",
    "description": "Stir-fried noodles with shrimp, tofu, peanuts, and a tangy sauce.",
    "category": "Thai",
    "price": 10.49,
    "available": true,
    "image_url": "https://images.unsplash.com/photo-1592194996308-7a8133325b2f"
  },
  {
    "name": "Ice Cream Sundae",
    "description": "Vanilla ice cream with chocolate syrup, whipped cream, and a cherry.",
    "category": "Dessert",
    "price": 4.49,
    "available": true,
    "image_url": "https://images.unsplash.com/photo-1576411116893-330a9d5da35d"
  },
  {
    "name": "Cappuccino",
    "description": "Espresso with steamed milk and a layer of foamed milk.",
    "category": "Beverage",
    "price": 3.49,
    "available": true,
    "image_url": "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5"
  },
  {
    "name": "Grilled Salmon",
    "description": "Fresh salmon fillet grilled to perfection, served with lemon and herbs.",
    "category": "Seafood",
    "price": 13.99,
    "available": true,
    "image_url": "https://images.unsplash.com/photo-1547592168-eb8b66ab6d7b"
  }
  
  ];

async function main() {
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        console.log('Connected successfully to MongoDB');

        // Interact with the 'food_reservation' database and 'reservations' collection
        const database = client.db('food_reservation');
        const collection = database.collection('reservations');

        // Insert multiple documents (the food dataset)
        const result = await collection.insertMany(foodData);
        console.log('Inserted documents with IDs:', result.insertedIds);

    } catch (e) {
        console.error(e);
    } finally {
        // Close the connection
        await client.close();
    }
}

main().catch(console.error);
