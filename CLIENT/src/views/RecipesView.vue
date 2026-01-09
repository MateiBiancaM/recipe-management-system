<script setup>
import { onMounted, ref } from 'vue'
import { useRecipeStore } from '../stores/recipeStore'
import RecipeCard from '../components/RecipeCard.vue'
import RecipeDetailsDialog from '../components/RecipeDetailsDialog.vue'

const store = useRecipeStore()
const isDialogOpen = ref(false)
const selectedRecipe = ref(null)

onMounted(() => {
  store.fetchRecipes()
})

const openDetails = (recipe) => {
  selectedRecipe.value = recipe
  isDialogOpen.value = true
}
</script>

<template>
  <v-container fluid class="pa-4 pa-md-8">
    
    <div class="mb-6 ml-2">
      <h1 class="text-h4 text-purple font-weight-bold">Rețete</h1>
    </div>

    <div v-if="store.loading" class="text-center mt-10">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </div>

    <div v-else>
      <RecipeCard 
        v-for="item in store.recipes"
        :key="item.id"
        :recipe="item" 
        @click="openDetails(item)" 
      />
    </div>

    <RecipeDetailsDialog 
      v-if="selectedRecipe"
      v-model="isDialogOpen"
      :recipe="selectedRecipe"
    />
  </v-container>
</template>