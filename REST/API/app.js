const express = require('express'); 
const cors = require('cors'); 
require('dotenv').config();

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

app.get('/recipes', (req, res) => {
    res.status(200).json(recipes) 
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})