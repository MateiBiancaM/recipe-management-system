<script setup>
import { onMounted, ref } from 'vue';
import { useRecipeStore } from '@/stores/recipeStore'; 
import { useRouter, useRoute } from 'vue-router';
import { useSnackbarStore } from '@/stores/snackbar';
import RecipeForm from '@/components/RecipeForm.vue';

const recipeStore = useRecipeStore();
const router = useRouter();
const route = useRoute();
const snackbar = useSnackbarStore();
const recipeId = route.params.id;
const isLoadingData = ref(true);
const existingRecipe = ref(null);
const isSubmitting = ref(false);

onMounted(async () => {
  await recipeStore.fetchRecipeById(recipeId);
  if (recipeStore.currentRecipe) {
    existingRecipe.value = recipeStore.currentRecipe;
  } else {
    snackbar.showError("Rețeta nu a fost găsită sau a fost ștearsă.");
    router.push('/my-recipes');
  }
  isLoadingData.value = false;
});

async function handleUpdate(validData) {
  isSubmitting.value = true;
  try {
    if (validData.rawImageFile) {
      const imageUrl = await recipeStore.uploadImage(validData.rawImageFile);
      validData.imageUrl = imageUrl;
    }
    delete validData.rawImageFile;
    const success = await recipeStore.updateRecipe(recipeId, validData);
    if (success) {
      snackbar.showSuccess("Rețeta a fost actualizată cu succes!");
      router.push('/my-recipes');
    } else {
      throw new Error(recipeStore.error);
    }
  } catch (err) {
    console.error(err);
    snackbar.showError("Eroare la actualizare: " + err.message);
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <v-container class="mx-auto" style="max-width: 800px;">
    <h2 class="mb-4 text-purple">Editează Rețeta</h2>

    <div v-if="isLoadingData" class="text-center mt-10">
      <v-progress-circular indeterminate color="purple" size="64"></v-progress-circular>
    </div>

    <RecipeForm 
      v-else
      :initial-data="existingRecipe"
      button-label="Actualizează Rețeta"
      :is-loading="isSubmitting"
      @submit="handleUpdate"
    />
  </v-container>
</template>