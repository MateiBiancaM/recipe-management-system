<script setup>
import { ref, watch } from 'vue';
import { DIFFICULTY_LEVELS, DEFAULT_UNIT } from '@/constants'; 
import { useRecipeValidator } from '@/composables/useRecipeValidator';

const props = defineProps({
  initialData: { type: Object, default: null },
  isLoading: { type: Boolean, default: false },
  buttonLabel: { type: String, default: 'Salvează Rețeta' }
});

const emit = defineEmits(['submit']);

const { errors: errorMessages, validate } = useRecipeValidator();
const showError = ref(false);

const recipe = ref({
  title: '',
  description: '',
  details: { 
    difficulty: DIFFICULTY_LEVELS[0], 
    servings: 2, 
    time: { prep: 15, cook: 30 } 
  },
  ingredients: [
    { name: '', quantity: '', unit: DEFAULT_UNIT }, 
    { name: '', quantity: '', unit: DEFAULT_UNIT }
  ],
  steps: [
    { order: 1, instruction: '' }, 
    { order: 2, instruction: '' }
  ]
});

watch(() => props.initialData, (newData) => {
  if (newData) recipe.value = JSON.parse(JSON.stringify(newData));
}, { immediate: true });

function addIngredient() { 
  recipe.value.ingredients.push({ name: '', quantity: '', unit: DEFAULT_UNIT }); 
}

function removeIngredient(index) { 
  recipe.value.ingredients.splice(index, 1); 
}

function addStep() { 
  recipe.value.steps.push({ order: recipe.value.steps.length + 1, instruction: '' }); 
}

function removeStep(index) {
  recipe.value.steps.splice(index, 1);
  recipe.value.steps.forEach((step, idx) => step.order = idx + 1);
}

function submitForm() {
  showError.value = false;
  const result = validate(recipe.value);
  
  if (!result.isValid) {
    showError.value = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  
  recipe.value.ingredients = result.cleanIngredients;
  recipe.value.steps = result.cleanSteps;
  
  emit('submit', recipe.value);
}

const fieldProps = { variant: 'outlined', density: 'compact', hideDetails: true };
const hasError = (keyword) => errorMessages.value.some(msg => msg.includes(keyword));
</script>

<template>
  <v-container class="mx-auto" style="max-width: 800px;">
    <v-expand-transition>
      <v-alert v-if="showError" type="error" variant="tonal" class="mb-4" closable @click:close="showError = false">
        <ul class="ml-4"><li v-for="err in errorMessages" :key="err">{{ err }}</li></ul>
      </v-alert>
    </v-expand-transition>

    <v-form @submit.prevent="submitForm">
      
      <v-card class="mb-3 pa-3" elevation="2">
        <div class="text-subtitle-2 mb-1">Titlu <span class="text-red">*</span></div>
        <v-text-field v-model="recipe.title" v-bind="fieldProps" class="mb-3" :error="hasError('Titlul')"></v-text-field>

        <div class="text-subtitle-2 mb-1">Descriere <span class="text-red">*</span></div>
        <v-textarea v-model="recipe.description" v-bind="fieldProps" rows="2" class="mb-3" :error="hasError('Descrierea')"></v-textarea>

        <v-row dense>
          <v-col cols="6" sm="3">
            <div class="text-subtitle-2 mb-1">Dificultate</div>
            <v-select v-model="recipe.details.difficulty" :items="DIFFICULTY_LEVELS" v-bind="fieldProps"></v-select>
          </v-col>
          <v-col cols="6" sm="3">
            <div class="text-subtitle-2 mb-1">Porții</div>
            <v-text-field v-model.number="recipe.details.servings" type="number" min="1" v-bind="fieldProps"></v-text-field>
          </v-col>
          <v-col cols="6" sm="3">
            <div class="text-subtitle-2 mb-1">Prep (min)</div>
            <v-text-field v-model.number="recipe.details.time.prep" type="number" min="0" v-bind="fieldProps"></v-text-field>
          </v-col>
          <v-col cols="6" sm="3">
            <div class="text-subtitle-2 mb-1">Gătit (min)</div>
            <v-text-field v-model.number="recipe.details.time.cook" type="number" min="0" v-bind="fieldProps"></v-text-field>
          </v-col>
        </v-row>
      </v-card>

      <v-card class="mb-3 pa-3" elevation="2" :style="hasError('ingrediente') ? 'border: 1px solid red' : ''">
        <div class="d-flex justify-space-between align-center mb-2">
          <h4 class="text-subtitle-1">Ingrediente</h4>
          <v-btn size="x-small" color="green" variant="tonal" @click="addIngredient">+ Adaugă</v-btn>
        </div>

        <div v-for="(item, index) in recipe.ingredients" :key="index" class="mb-3 bg-grey-lighten-5 pa-2 rounded">
          <v-row dense align="center">
            <v-col cols="12" sm="6">
               <v-text-field v-model="item.name" placeholder="Ingredient" hide-details density="compact" variant="outlined"></v-text-field>
            </v-col>
            
            <v-col cols="5" sm="2">
              <v-text-field v-model="item.quantity" placeholder="Cant." hide-details density="compact" variant="outlined"></v-text-field>
            </v-col>

            <v-col cols="5" sm="3">
              <v-text-field v-model="item.unit" placeholder="Unit." hide-details density="compact" variant="outlined"></v-text-field>
            </v-col>

            <v-col cols="2" sm="1" class="d-flex justify-center">
              <v-btn icon="mdi-delete" size="small" color="red" variant="text" @click="removeIngredient(index)"></v-btn>
            </v-col>
          </v-row>
        </div>
      </v-card>

      <v-card class="mb-3 pa-3" elevation="2" :style="hasError('pași') ? 'border: 1px solid red' : ''">
        <div class="d-flex justify-space-between align-center mb-2">
          <h4 class="text-subtitle-1">Pași</h4>
          <v-btn size="x-small" color="green" variant="tonal" @click="addStep">+ Adaugă</v-btn>
        </div>
        <div v-for="(step, index) in recipe.steps" :key="index" class="d-flex align-start mb-2">
          <span class="mr-2 mt-2 font-weight-bold text-grey-darken-1">{{ index + 1 }}.</span>
          <v-textarea v-model="step.instruction" rows="1" auto-grow class="flex-grow-1" v-bind="fieldProps"></v-textarea>
          <v-btn icon="mdi-delete" size="x-small" color="red" variant="text" class="mt-1" @click="removeStep(index)"></v-btn>
        </div>
      </v-card>

      <v-btn color="purple-darken-2" block size="large" type="submit" :loading="isLoading" class="mb-5">
        {{ buttonLabel }}
      </v-btn>
    </v-form>
  </v-container>
</template>