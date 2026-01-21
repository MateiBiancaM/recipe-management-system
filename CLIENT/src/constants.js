export const DIFFICULTY_LEVELS = ['Ușor', 'Mediu', 'Greu'];
export const DEFAULT_UNIT = 'g';
export const MIN_INGREDIENTS = 2;
export const MIN_STEPS = 2;

export const ERROR_MESSAGES = {
  TITLE_REQUIRED: "Titlul rețetei este obligatoriu.",
  DESC_REQUIRED: "Descrierea este obligatorie.",
  MIN_INGREDIENTS: `Trebuie să ai minim ${MIN_INGREDIENTS} ingrediente completate.`,
  MIN_STEPS: `Trebuie să ai minim ${MIN_STEPS} pași de preparare.`,
  TOO_LONG: (field, max) => `${field} nu poate depăși ${max} caractere.`,
  TOO_HIGH: (field, max) => `${field} nu poate fi mai mare de ${max}.`,
  TOO_LOW: (field, min) => `${field} trebuie să fie minim ${min}.`
};

export const LIMITS = {
  TITLE_MAX: 50,          
  DESCRIPTION_MAX: 1000,  
  INGREDIENT_MAX: 200,    
  STEP_MAX: 1000,         
  NUMBER_MAX: 1000,       
  MIN_SERVINGS: 1,
  MIN_TIME: 1
};