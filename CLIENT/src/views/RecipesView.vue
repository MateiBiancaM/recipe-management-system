<script setup>
import { onMounted } from 'vue'
import { useRecipeStore } from '../stores/recipeStore'
import RecipeCard from '../components/RecipeCard.vue'

const store = useRecipeStore()

onMounted(() => {
  store.fetchRecipes()
})
</script>

<template>
  <div>
    <h1>Lista Rețetelor</h1>

    <div v-if="store.loading">
      Se incarca retetele...
    </div>

    <div v-else-if="store.error" style="color: red;">
      Eroare: {{ store.error }}
    </div>

    <div v-else>
      <RecipeCard 
        v-for="item in store.recipes" 
        :key="item.id" 
        :recipe="item" 
      />
    </div>
  </div>
</template>