import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRecipeStore = defineStore('recipes', () => {
  const recipes = ref([])
  const currentRecipe = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // legatura cu backend-ul
  async function fetchRecipes() {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('http://localhost:8080/recipes')
      
      if (!response.ok) throw new Error('Nu am putut conecta la server!')
      const data = await response.json() // salveaza datele primite
      recipes.value = data
      
    } catch (err) {
      console.error(err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function fetchRecipeById(id) {
    loading.value = true
    currentRecipe.value = null // resetam inainte sa incarcam
    try {
      const res = await fetch(`http://localhost:8080/recipes/${id}`)
      if (!res.ok) throw new Error('Nu am găsit rețeta')
      currentRecipe.value = await res.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { recipes, loading, error, fetchRecipes, currentRecipe, fetchRecipeById }
})