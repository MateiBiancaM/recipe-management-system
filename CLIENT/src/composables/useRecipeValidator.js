import { ref } from 'vue';
import { MIN_INGREDIENTS, MIN_STEPS, ERROR_MESSAGES } from '@/constants';

export function useRecipeValidator() {
  const errors = ref([]);

  function validate(recipe) {
    errors.value = [];
    
    if (!recipe.title?.trim()) errors.value.push(ERROR_MESSAGES.TITLE_REQUIRED);
    if (!recipe.description?.trim()) errors.value.push(ERROR_MESSAGES.DESC_REQUIRED);
    
    const cleanIngredients = recipe.ingredients.filter(i => i.name.trim().length > 0);
    if (cleanIngredients.length < MIN_INGREDIENTS) {
      errors.value.push(ERROR_MESSAGES.MIN_INGREDIENTS);
    }

    const cleanSteps = recipe.steps.filter(s => s.instruction.trim().length > 0);
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