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
  const success = await recipeStore.updateRecipe(recipeId, validData);

  if (success) {
    snackbar.showSuccess("Rețeta a fost actualizată cu succes!");
    router.push('/my-recipes');
  } else {
    snackbar.showError("Eroare la actualizare: " + recipeStore.error);
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
      :is-loading="recipeStore.loading"
      @submit="handleUpdate"
    />
  </v-container>
</template>