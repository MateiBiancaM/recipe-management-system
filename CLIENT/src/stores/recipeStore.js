import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './user'

export const useRecipeStore = defineStore('recipes', () => {
  const recipes = ref([])
  const currentRecipe = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const userStore = useUserStore();
  const API_URL = `${import.meta.env.VITE_API_URL}/recipes`

  async function getAllRecipes() {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) throw new Error('Nu am putut încărca lista de rețete!')
      const data = await response.json()
      recipes.value = data 
    } catch (err) {
      console.error(err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function getMyRecipes() {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${API_URL}/my-recipes`, { 
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userStore.token}` 
        }
      })
      if (!response.ok) throw new Error('Nu am putut încărca rețetele tale!')
      const data = await response.json()
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
    currentRecipe.value = null
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        headers: {
          'Authorization': `Bearer ${userStore.token}`
        }
      })
      if (!res.ok) throw new Error('Nu am găsit rețeta')
      currentRecipe.value = await res.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function addRecipe(newRecipe) {
    loading.value = true

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userStore.token}`
        },
        body: JSON.stringify(newRecipe)
      })
      if (!response.ok) throw new Error('Eroare la salvare')
      return true 
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  async function deleteRecipe(id) {
    loading.value = true
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userStore.token}`
        }
      })

      if (!response.ok) throw new Error('Eroare la ștergere')
      recipes.value = recipes.value.filter(r => r.id !== id)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function updateRecipe(id, updatedData) {
    loading.value = true;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userStore.token}`
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) throw new Error('Eroare la actualizare');
    
      const index = recipes.value.findIndex(r => r.id === id);
      if (index !== -1) {
        recipes.value[index] = { ...recipes.value[index], ...updatedData };
      }

      return true;
    } catch (err) {
      error.value = err.message;
      return false;
    } finally {
      loading.value = false;
    }
}

  return { 
    recipes, 
    currentRecipe, 
    loading, 
    error, 
    getAllRecipes,   
    getMyRecipes,   
    fetchRecipeById, 
    addRecipe, 
    deleteRecipe ,
    updateRecipe
  }
})