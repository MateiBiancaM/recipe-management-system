const { db } = require('../db'); 
const recipesCollection = db.collection('recipes');

//get all
exports.getAllRecipes = async (req, res) => {
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
};

//get by id
exports.getRecipeById = async (req, res) => {
    try {
        const doc = await recipesCollection.doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).send('Reteta nu a fost gasita');
        }
        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//post/create
exports.createRecipe = async (req, res) => {
    try {
        const data = req.body;
        const docRef = await recipesCollection.add(data);
        res.status(201).json({ id: docRef.id, ...data });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//put/update
exports.updateRecipe = async (req, res) => {
    try {
        const data = req.body;
        const docRef = recipesCollection.doc(req.params.id);
        const doc = await docRef.get(); 
        if (!doc.exists) {
            return res.status(404).send('Reteta nu a fost gasita');
        }
        await docRef.update(data);
        res.status(200).json({ id: docRef.id, ...data });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//delete
exports.deleteRecipe = async (req, res) => {
    try {
        const docRef = recipesCollection.doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).send('Reteta nu a fost gasita');
        }
        await docRef.delete();
        res.status(200).send('Reteta a fost stearsa cu succes');
    } catch (error) {
        res.status(500).send(error.message);
    }
};