import { ref } from 'vue';
import { MIN_INGREDIENTS, MIN_STEPS, ERROR_MESSAGES, LIMITS } from '@/constants';

export function useRecipeValidator() {
  const errors = ref([]);

  function validate(recipe) {
    errors.value = [];
    
    if (!recipe.title?.trim()) {
      errors.value.push(ERROR_MESSAGES.TITLE_REQUIRED);}
    else if (recipe.title.length > LIMITS.TITLE_MAX) {
      errors.value.push(ERROR_MESSAGES.TOO_LONG('Titlul', LIMITS.TITLE_MAX));
    }
    if (!recipe.description?.trim()) {
      errors.value.push(ERROR_MESSAGES.DESC_REQUIRED);
    } else if (recipe.description.length > LIMITS.DESCRIPTION_MAX) {
      errors.value.push(ERROR_MESSAGES.TOO_LONG('Descrierea', LIMITS.DESCRIPTION_MAX));
    }

    const { servings, time } = recipe.details || {};

    if ((servings || 0) < LIMITS.MIN_SERVINGS) {
      errors.value.push(ERROR_MESSAGES.TOO_LOW('Numărul de porții', LIMITS.MIN_SERVINGS));
    }
    if (servings > LIMITS.NUMBER_MAX) {
      errors.value.push(ERROR_MESSAGES.TOO_HIGH('Numărul de porții', LIMITS.NUMBER_MAX));
    }

    const prepTime = Number(time?.prep) || 0;
    const cookTime = Number(time?.cook) || 0;

    if (prepTime > LIMITS.NUMBER_MAX) {
        errors.value.push(ERROR_MESSAGES.TOO_HIGH('Timpul de preparare', LIMITS.NUMBER_MAX));
    }
    if (prepTime < LIMITS.MIN_TIME) {
        errors.value.push(ERROR_MESSAGES.TOO_LOW('Timpul de preparare', LIMITS.MIN_TIME));
    }

    if (cookTime > LIMITS.NUMBER_MAX) {
        errors.value.push(ERROR_MESSAGES.TOO_HIGH('Timpul de gătire', LIMITS.NUMBER_MAX));
    }
    if (cookTime < LIMITS.MIN_TIME) {
        errors.value.push(ERROR_MESSAGES.TOO_LOW('Timpul de gătire', LIMITS.MIN_TIME));
    }

    const cleanIngredients = recipe.ingredients.filter(i => {
        const hasName = i.name && i.name.trim().length > 0;
        
        if (hasName && i.name.length > LIMITS.INGREDIENT_MAX) {
            errors.value.push(ERROR_MESSAGES.TOO_LONG('Un ingredient', LIMITS.INGREDIENT_MAX));
            return false; 
        }
        return hasName;
    });

    if (cleanIngredients.length < MIN_INGREDIENTS) {
      errors.value.push(ERROR_MESSAGES.MIN_INGREDIENTS);
    }

    const cleanSteps = recipe.steps.filter(s => {
        const hasText = s.instruction && s.instruction.trim().length > 0;
        
        if (hasText && s.instruction.length > LIMITS.STEP_MAX) {
            errors.value.push(ERROR_MESSAGES.TOO_LONG('Un pas de preparare', LIMITS.STEP_MAX));
            return false;
        }
        return hasText;
    });

    if (cleanSteps.length < MIN_STEPS) {
      errors.value.push(ERROR_MESSAGES.MIN_STEPS);
    }

    return {
      isValid: errors.value.length === 0,
      cleanIngredients,
      cleanSteps
    };
  }

  return { errors, validate };
}