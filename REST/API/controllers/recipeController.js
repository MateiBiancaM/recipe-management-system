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

//get my recipes by userId
exports.getMyRecipes = async (req, res) => {
   try {
        const userId = req.user.uid; 
        const snapshot = await recipesCollection.where('userId', '==', userId).get();
        
        const list = [];
        snapshot.forEach(doc => {
            list.push({ id: doc.id, ...doc.data() });
        });
        
        res.status(200).json(list);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//post/create
exports.createRecipe = async (req, res) => {
    try {
        const { title, description, details, ingredients, steps } = req.body;
        if (!title || !ingredients || ingredients.length === 0) {
            return res.status(400).send('Rețeta trebuie să aibă titlu și ingrediente.');
        }
        const newRecipe = {
            title,
            description: description || "",
            details: {
                difficulty: details?.difficulty || "Usor",
                servings: details?.servings || 2,
                time: {
                    prep: details?.time?.prep || 0,
                    cook: details?.time?.cook || 0
                }
            },
            ingredients, 
            steps: steps || [], 
            userId: req.user.uid,
            createdAt: new Date().toISOString()
        };

        const docRef = await recipesCollection.add(newRecipe);
        res.status(201).json({ id: docRef.id, ...newRecipe });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//put/update
exports.updateRecipe = async (req, res) => {
   try {
        const docRef = recipesCollection.doc(req.params.id);
        const doc = await docRef.get(); 

        if (!doc.exists) {
            return res.status(404).send('Rețeta nu a fost găsită');
        }

        if (doc.data().userId !== req.user.uid) {
            return res.status(403).send('Nu ai permisiunea să modifici această rețetă!');
        }

        const data = req.body;
        const updateData = {
            ...data,
            updatedAt: new Date().toISOString()
        };

        await docRef.update(updateData);
        res.status(200).json({ id: doc.id, ...updateData });
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
            return res.status(404).send('Rețeta nu a fost găsită');
        }

        if (doc.data().userId !== req.user.uid) {
            return res.status(403).send('Nu ai permisiunea să ștergi această rețetă!');
        }

        await docRef.delete();
        res.status(200).send('Rețeta a fost ștearsă cu succes');
    } catch (error) {
        res.status(500).send(error.message);
    }
};