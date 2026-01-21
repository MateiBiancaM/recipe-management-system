const { db, bucket } = require('../db'); 
const recipesCollection = db.collection('recipes');
const { logSuccess, logWarn, logError } = require('../utils/logger');
const { validateAndPrepareData } = require('../utils/validator'); 
const { handleControllerError } = require('../utils/errorHandler');
const { getFileNameFromUrl } = require('../utils/fileHelpers');

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
        logSuccess('GET ALL', `Returnat ${list.length} rețete.`);
        res.status(200).json(list);
    } catch (error) {
        handleControllerError(res, error, 'GET ALL');
    }
};

//get by id
exports.getRecipeById = async (req, res) => {
    try {
        const doc = await recipesCollection.doc(req.params.id).get();
        if (!doc.exists) {
            logWarn('GET ID', `Rețeta ${req.params.id} nu există.`);
            return res.status(404).send('Reteta nu a fost gasita');
        }
        logSuccess('GET ID', `Găsit: ${doc.data().title}`);
        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        handleControllerError(res, error, 'GET ID');
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
        logSuccess('GET MY RECIPES', `Userul a cerut rețetele proprii. Găsite: ${list.length}`);
        res.status(200).json(list);
    } catch (error) {
        handleControllerError(res, error, 'GET MY RECIPES');
    }
};

//post/create
exports.createRecipe = async (req, res) => {
    try {
        const cleanData = validateAndPrepareData(req.body);

        const docRef = await recipesCollection.add({
            ...cleanData,
            userId: req.user.uid,
            createdAt: new Date().toISOString()
        });
        logSuccess('CREATE', `Rețetă nouă creată: "${cleanData.title}" (ID: ${docRef.id})`);
        res.status(201).json({ id: docRef.id, ...cleanData });
    } catch (error) {
        handleControllerError(res, error, 'CREATE');
    }
};

//put/update
exports.updateRecipe = async (req, res) => {
   try {
        const docRef = recipesCollection.doc(req.params.id);
        const doc = await docRef.get(); 

        if (!doc.exists) {
            logWarn('UPDATE', `ID inexistent: ${req.params.id}`);
            return res.status(404).send('Rețeta nu a fost găsită');
        }

        if (doc.data().userId !== req.user.uid) {
            logWarn('UPDATE SECURITY', `Userul ${req.user.uid} a încercat să modifice rețeta altcuiva!`);
            return res.status(403).send('Nu ai permisiunea să modifici această rețetă!');
        }

        const cleanData = validateAndPrepareData(req.body);
        const updateData = {
            ...cleanData,
            updatedAt: new Date().toISOString()
        };
        
        if (req.body.imageUrl) {
            updateData.imageUrl = req.body.imageUrl;
            const oldImageUrl = doc.data().imageUrl;
            if (oldImageUrl) {
                const oldFileName = getFileNameFromUrl(oldImageUrl);
                if (oldFileName) {
                    try {
                        await bucket.file(oldFileName).delete();
                        logSuccess('Storage', `Ștersă imaginea veche (Update): ${oldFileName}`);
                    } catch (err) {
                        logWarn('Storage', `Nu s-a putut șterge imaginea veche (Update): ${oldFileName}`);
                    }
                }
            }
        }    

        await docRef.update(updateData);
        logSuccess('UPDATE', `Actualizat rețeta: "${cleanData.title}"`);
        res.status(200).json({ id: doc.id, ...updateData });
    } catch (error) {
        handleControllerError(res, error, 'UPDATE');
    }
};

//delete
exports.deleteRecipe = async (req, res) => {
    try {
        const docRef = recipesCollection.doc(req.params.id);
        const doc = await docRef.get();

        if (!doc.exists) {
            logWarn('DELETE', `ID inexistent: ${req.params.id}`);
            return res.status(404).send('Rețeta nu a fost găsită');
        }

        if (doc.data().userId !== req.user.uid) {
            logWarn('DELETE SECURITY', `Tentativă ștergere neautorizată.`);
            return res.status(403).send('Nu ai permisiunea să ștergi această rețetă!');
        }

        if (recipeData.imageUrl) {
            const fileName = getFileNameFromUrl(recipeData.imageUrl);
            if (fileName) {
                try {
                    await bucket.file(fileName).delete();
                    logSuccess('Storage', `Ștersă imaginea asociată: ${fileName}`);
                } catch (imgError) {
                    logWarn('Storage', `Nu s-a putut șterge imaginea: ${fileName}`);
                }
            }
        }
        await docRef.delete();
        logSuccess('DELETE', `Șters rețeta cu ID: ${req.params.id}`);
        res.status(200).send('Rețeta a fost ștearsă cu succes');
    } catch (error) {
        handleControllerError(res, error, 'DELETE');
    }
};