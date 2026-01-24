<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRecipeStore } from '@/stores/recipeStore' 
import { useRecipeSorter } from '@/composables/useRecipeSorter'
import RecipeCard from '@/components/RecipeCard.vue'

const store = useRecipeStore()

const showDeleteDialog = ref(false)
const recipeToDelete = ref(null)
const isDeleting = ref(false)
const { searchQuery, paginateRecipes, loadMore, hasMore } = useRecipeSorter(computed(() => store.recipes));

const onIntersect = (isIntersecting) => {
  if (isIntersecting && hasMore.value) {
    setTimeout(() => {
      loadMore();
    }, 300); 
  }
}

const openDeleteModal = (id) => {
  recipeToDelete.value = id
  showDeleteDialog.value = true
}

const confirmDelete = async () => {
  if (!recipeToDelete.value) return

  isDeleting.value = true
  await store.deleteRecipe(recipeToDelete.value)
  
  isDeleting.value = false
  showDeleteDialog.value = false
  recipeToDelete.value = null
}

onMounted(() => {
  store.getMyRecipes()
})
</script>

<template>
  <v-container fluid class="pa-4 pa-md-8">
    
    <div class="mb-6 ml-2">
      <v-row align="center">
        
        <v-col cols="12" md="3">
          <h1 class="text-h4 text-purple font-weight-bold">Rețetele Mele</h1>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="searchQuery"
            label="Caută în rețetele tale..."
            prepend-inner-icon="mdi-magnify"
            variant="outlined" 
            density="compact"
            hide-details
            clearable
            bg-color="white"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3" class="d-flex justify-md-end">
          <v-btn 
            color="purple-darken-2" 
            prepend-icon="mdi-plus"
            to="/add-recipe"
            class="w-100 w-md-auto"
            height="40"
          >
            Adaugă Rețetă
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <div v-if="store.loading && !showDeleteDialog" class="text-center mt-10">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </div>

    <div v-else>
      <div v-if="store.recipes.length === 0" class="text-center mt-10 text-grey">
        <h3>Nu ai nicio rețetă adăugată.</h3>
      </div>

      <RecipeCard 
        v-for="item in paginateRecipes" 
        :key="item.id"
        :recipe="item"
      >
  
        <template #actions>
           <v-btn 
             color="blue-lighten-4" variant="flat" class="text-blue-darken-2 mr-2" icon="mdi-pencil" size="small"
             :to="`/edit-recipe/${item.id}`"
             @click.stop
             v-tooltip:top="'Modifică'"
           ></v-btn>
    
           <v-btn 
             color="red-lighten-4" variant="flat" class="text-red-darken-2" icon="mdi-delete" size="small"
             @click.stop="openDeleteModal(item.id)"
             v-tooltip:top="'Șterge'"
           ></v-btn>
        </template>

      </RecipeCard>
      <div 
        v-if="hasMore" 
        v-intersect="onIntersect" 
        class="text-center py-6"
      >
        <v-progress-circular indeterminate color="purple-lighten-3" size="40"></v-progress-circular>
      </div>
      <div v-if="paginateRecipes.length === 0 && store.recipes.length > 0" class="text-center mt-10 text-grey-darken-1">
        <h3>Nu am găsit rețete pentru "<strong>{{ searchQuery }}</strong>"</h3>
      </div>
      <div v-if="!hasMore && paginateRecipes.length > 0" class="text-center mt-4 text-grey-lighten-1 text-caption">
         Acestea sunt toate rețetele tale
      </div>
    </div>

    <v-dialog v-model="showDeleteDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5 text-red-darken-1 bg-red-lighten-5 pa-4">
          <v-icon icon="mdi-alert" start></v-icon>
          Confirmă ștergerea
        </v-card-title>

        <v-card-text class="pa-4 pt-6 text-body-1">
          Ești sigur că vrei să ștergi această rețetă? 
          <br>
          <span class="text-grey text-caption">Această acțiune este ireversibilă.</span>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          
          <v-btn 
            variant="text" 
            color="grey-darken-1" 
            @click="showDeleteDialog = false"
          >
            Nu, Anulează
          </v-btn>

          <v-btn 
            color="red" 
            variant="elevated" 
            @click="confirmDelete"
            :loading="isDeleting"
            prepend-icon="mdi-delete"
          >
            Da, Șterge
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>