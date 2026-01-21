<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRecipeStore } from '@/stores/recipeStore' 
import { useRecipeSorter } from '@/composables/useRecipeSorter'
import RecipeCard from '@/components/RecipeCard.vue'
import RecipeDetailsDialog from '@/components/RecipeDetailsDialog.vue'

const store = useRecipeStore()
const isDialogOpen = ref(false)
const selectedRecipe = ref(null)
const { sortBy, searchQuery, searchBy, filteredAndSortedRecipes } = useRecipeSorter(computed(() => store.recipes));

onMounted(() => {
  store.getAllRecipes();
})

const openDetails = (recipe) => {
  selectedRecipe.value = recipe
  isDialogOpen.value = true
}
</script>

<template>
  <v-container fluid class="pa-4 pa-md-8">
    
    <div class="mb-6 ml-2">
      <v-row align="center" class="mb-6">

      <v-col cols="12" md="3">
        <h1 class="text-h4 text-purple font-weight-bold">Rețete</h1>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="searchQuery"
          :label="searchBy === 'title' ? 'Caută rețetă...' : 'Caută ingredient...'"
          prepend-inner-icon="mdi-magnify"
          variant="outlined" 
          density="compact"
          hide-details
          clearable
          @click:clear="searchQuery=''"
          bg-color="white"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-select
          v-model="searchBy"
          :items="[
            { title: 'După titlu', value: 'title' },
            { title: 'După ingredient', value: 'ingredient' }
          ]"
          label="Caută"
          variant="outlined"
          density="compact"
          hide-details
          bg-color="white"
          prepend-inner-icon="mdi-filter-variant"
        ></v-select>
      </v-col>

      <v-col cols="12" md="3">
        <v-select
          v-model="sortBy"
          :items="[
            { title: 'Toate', value: 'default' },
            { title: 'Cele mai noi', value: 'newest' },
            { title: 'De la A-Z', value: 'az' },
            { title: 'De la Z-A', value: 'za' },
            { title: 'Cele mai rapide', value: 'fastest' },
            { title: 'Cele mai lente', value: 'slowest' },
            { title: 'Ușor -> Greu', value: 'difficulty_easy' },
            { title: 'Greu -> Ușor', value: 'difficulty_hard' }
          ]"
          label="Sortează"
          variant="outlined"
          density="compact"
          hide-details
          bg-color="white"
          prepend-inner-icon="mdi-sort"
        ></v-select>
      </v-col>

    </v-row>
    </div>

    <div v-if="store.loading" class="text-center mt-10">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </div>

    <div v-else>

      <RecipeCard 
        v-for="item in filteredAndSortedRecipes" 
        :key="item.id"
        :recipe="item" 
        @click="openDetails(item)" 
      >
        <template #actions>
           <v-btn 
             color="purple-lighten-4" 
             variant="flat" 
             class="text-purple-darken-2 font-weight-bold" 
             append-icon="mdi-arrow-right"
             @click.stop="openDetails(item)"
           >
             Vezi Detalii
           </v-btn>
        </template>

      </RecipeCard>
      <div v-if="filteredAndSortedRecipes.length === 0 && store.recipes.length > 0" class="text-center mt-10 text-grey-darken-1">
        <h3>Nu am găsit rețete cu {{ searchBy === 'title' ? 'titlul' : 'ingredientul' }} "<strong>{{ searchQuery }}</strong>"</h3>
    </div>
    </div> 

    <RecipeDetailsDialog 
      v-if="selectedRecipe"
      v-model="isDialogOpen"
      :recipe="selectedRecipe"
    />
  </v-container>
</template>