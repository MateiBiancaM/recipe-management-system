const express = require('express'); 
const cors = require('cors'); 
require('dotenv').config();
const db = require('./db');

const app = express(); 
const PORT = process.env.PORT || 8080; 

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`) 
    next()
})

let recipes = [
    {
        id: 1, title: 'Paste Carbonara', difficulty: 'Mediu'
    },
    {
        id: 2, title: 'Supa Crema', difficulty: 'Usor'
    },
    {
        id: 3, title: 'Tiramisu', difficulty: 'Mediu'
    }
]

app.use(cors()); 
app.use(express.json()); 

const recipesCollection = db.collection('recipes');

app.get('/recipes', async (req, res) => {
    try {
        const snapshot = await recipesCollection.get();
        const list = [];
        snapshot.forEach(doc => {
            list.push({
                id: doc.id,
                ...doc.data()
            });
        });
        res.status(200).json(list);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})