const { logSuccess, logInfo } = require('./utils/logger');
const express = require('express'); 
const cors = require('cors'); 
const morgan = require('morgan');
require('dotenv').config();

const app = express(); 
const PORT = process.env.PORT || 8080; 

app.use(morgan('dev'));
app.use((req, res, next) => {
    logInfo('REQUEST', `${req.method} ${req.url}`);
    next()
})

app.use(cors()); 
app.use(express.json()); 

const recipeRoutes = require('./routes/recipeRoutes');  
app.use('/recipes', recipeRoutes);   

app.listen(PORT, () => {
    logSuccess('SERVER', `Serverul rulează pe portul  http://localhost:${PORT}`);
})