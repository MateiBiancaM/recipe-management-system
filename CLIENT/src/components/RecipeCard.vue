<script setup>
import { formatTotalTime, getDifficultyColor } from '@/utils/formatters';

defineProps({ 
  recipe: { type: Object, required: true } 
})

defineEmits(['click']);
</script>

<template>
  <v-card 
    link 
    elevation="1" 
    class="mb-3 pa-2"  
    @click="$emit('click')"
  >
    
    <v-row align="center" no-gutters>

      <v-col cols="12" md="5">
        <div class="d-flex align-center pl-2">
          <v-avatar color="purple-lighten-5" size="50" class="mr-4">
            <v-icon color="purple-darken-2" icon="mdi-silverware-fork-knife"></v-icon>
          </v-avatar>
          <h3 class="text-h6 font-weight-bold">{{ recipe.title }}</h3>
        </div>
      </v-col>

      <v-col cols="12" md="4" class="py-2">
        <v-chip 
          prepend-icon="mdi-chef-hat"
          :color="getDifficultyColor(recipe.details?.difficulty)" 
          variant="tonal"
          class="mr-2 font-weight-bold"
        >
          {{ recipe.details?.difficulty }}
        </v-chip>

        <v-chip 
          prepend-icon="mdi-clock-outline"
          color="blue-grey" 
          variant="tonal"
          class="font-weight-bold"
        >
          {{ formatTotalTime(recipe.details?.time?.prep, recipe.details?.time?.cook) }}
        </v-chip>
      </v-col>

      <v-col cols="12" md="3" class="text-right pr-2">
        <slot name="actions"></slot> 
      </v-col>

    </v-row>
  </v-card>
</template>