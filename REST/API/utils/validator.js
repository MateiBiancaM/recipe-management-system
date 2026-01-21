export const validateAndPrepareData = (data) => {
    if (typeof data.title !== 'string') 
        throw new Error('Titlul trebuie să fie text.');
    if (typeof data.description !== 'string') 
        throw new Error('Descrierea trebuie să fie text.');
    
    if (data.title.length > 100) 
        throw new Error('Titlul este prea lung (max 100 caractere).');
    if (data.description.length > 2000) 
        throw new Error('Descrierea este prea lungă (max 2000 caractere).');

    if (data.title.trim() === '') 
        throw new Error('Titlul este obligatoriu.');
    if (data.description.trim() === '') 
        throw new Error('Descrierea este obligatorie.');

    if (!Array.isArray(data.ingredients)) 
        throw new Error('Format ingrediente invalid.');
    if (data.ingredients.length > 50) 
        throw new Error('Prea multe ingrediente (max 50).'); 
    if (data.ingredients.length < 2) 
        throw new Error('Trebuie să adaugi minim 2 ingrediente.');

    const validIngredients = data.ingredients.filter(i => 
        i.name && typeof i.name === 'string' && i.name.trim() !== ''
    );
    
    if (validIngredients.length < 2) 
        throw new Error('Ingredientele trebuie să aibă nume valid.');

    if (!Array.isArray(data.steps)) 
        throw new Error('Format pași invalid.');
    if (data.steps.length > 50) 
        throw new Error('Prea mulți pași (max 50).');
    if (data.steps.length < 2) 
        throw new Error('Trebuie să adaugi minim 2 pași de preparare.');

    return {
        title: data.title.trim(), 
        description: data.description.trim(),
        imageUrl: (data.imageUrl && typeof data.imageUrl === 'string') ? data.imageUrl : null,
        details: {
            difficulty: ["Ușor", "Mediu", "Greu"].includes(data.details?.difficulty) ? data.details.difficulty : "Ușor",
            servings: Number(data.details?.servings) || 2, 
            time: {
                prep: Number(data.details?.time?.prep) || 0,
                cook: Number(data.details?.time?.cook) || 0
            }
        },
        ingredients: validIngredients,
        steps: data.steps
    };
};