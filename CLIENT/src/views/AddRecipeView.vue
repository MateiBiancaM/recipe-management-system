<script setup>
import { useRecipeStore } from '@/stores/recipeStore'; 
import { useRouter } from 'vue-router';
import { useSnackbarStore } from '@/stores/snackbar';
import RecipeForm from '@/components/RecipeForm.vue'; 
import { ref } from 'vue';

const recipeStore = useRecipeStore();
const router = useRouter();
const snackbar = useSnackbarStore();
const isSubmitting = ref(false);


async function handleCreate(validData) {
  isSubmitting.value = true;
  try {
    if (validData.rawImageFile) {
      const imageUrl = await recipeStore.uploadImage(validData.rawImageFile);
      validData.imageUrl = imageUrl;
    }
    delete validData.rawImageFile;
    const success = await recipeStore.addRecipe(validData);
    if (success) {
      snackbar.showSuccess("Rețeta a fost salvată cu succes!");
      router.push('/my-recipes');
    } else {
      throw new Error(recipeStore.error);
    }
  } catch (err) {
    console.error(err);
    snackbar.showError("Nu am putut salva rețeta: " + err.message);
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <v-container class="mx-auto" style="max-width: 800px;">
    <h2 class="mb-4 text-purple">Adaugă Rețetă</h2>
    
    <RecipeForm 
      button-label="Salvează Rețeta"
      :is-loading="isSubmitting"
      @submit="handleCreate"
    />
  </v-container>
</template>