const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const checkAuth = require('../middleware/checkAuth');

router.get('/', recipeController.getAllRecipes);
router.get('/my-recipes', checkAuth, recipeController.getMyRecipes);
router.get('/:id', recipeController.getRecipeById);

router.post('/', checkAuth, recipeController.createRecipe);
router.put('/:id', checkAuth, recipeController.updateRecipe);
router.delete('/:id', checkAuth, recipeController.deleteRecipe);

module.exports = router;