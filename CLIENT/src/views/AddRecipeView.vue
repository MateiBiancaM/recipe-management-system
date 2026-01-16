<script setup>
import { useRecipeStore } from '@/stores/recipeStore'; 
import { useRouter } from 'vue-router';
import { useSnackbarStore } from '@/stores/snackbar';
import RecipeForm from '@/components/RecipeForm.vue'; 

const recipeStore = useRecipeStore();
const router = useRouter();
const snackbar = useSnackbarStore();

async function handleCreate(validData) {
  const success = await recipeStore.addRecipe(validData);
  if (success) {
    snackbar.showSuccess("Rețeta a fost salvată cu succes!");
    router.push('/my-recipes');
  } else {
    snackbar.showError("Nu am putut salva rețeta: " + recipeStore.error);
  }
}
</script>

<template>
  <v-container class="mx-auto" style="max-width: 800px;">
    <h2 class="mb-4 text-purple">Adaugă Rețetă</h2>
    
    <RecipeForm 
      button-label="Salvează Rețeta"
      :is-loading="recipeStore.loading"
      @submit="handleCreate"
    />
  </v-container>
</template>