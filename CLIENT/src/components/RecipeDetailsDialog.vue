<script setup>
defineProps({
  recipe: Object,
  modelValue: Boolean
})
defineEmits(['update:modelValue'])
</script>

<template>
  <v-dialog 
    :model-value="modelValue" 
    @update:model-value="$emit('update:modelValue', $event)" 
    max-width="800" 
    scrollable
  >
    <v-card>
      
      <v-toolbar color="grey-darken-4" title="Detalii Rețetă">
        <v-btn icon="mdi-close" @click="$emit('update:modelValue', false)"></v-btn>
      </v-toolbar>

      <v-card-text>
        
        <div class="text-center pa-4 bg-grey-lighten-3">
          <h1 class="text-h4 font-weight-bold">{{ recipe.title }}</h1>
          <p class="font-italic text-grey my-2">{{ recipe.description }}</p>

          <div class="d-flex justify-center gap-2 mt-2">
            <v-chip prepend-icon="mdi-chef-hat">{{ recipe.details?.difficulty }}</v-chip>
            <v-chip prepend-icon="mdi-clock-outline">{{ (recipe.details?.time?.prep || 0) + (recipe.details?.time?.cook || 0) }} min</v-chip>
            <v-chip prepend-icon="mdi-account">{{ recipe.details?.servings }} porții</v-chip>
          </div>
        </div>

        <v-divider></v-divider>

        <v-list lines="one">
          <v-list-subheader>INGREDIENTE</v-list-subheader>
          
          <v-list-item 
            v-for="(ing, i) in recipe.ingredients" 
            :key="i"
            prepend-icon="mdi-circle-small"
          >
            <v-list-item-title>
              <strong>{{ ing.quantity }} {{ ing.unit }}</strong> - {{ ing.name }}
            </v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list lines="two">
          <v-list-subheader>MOD DE PREPARARE</v-list-subheader>

          <v-list-item 
            v-for="(step, i) in recipe.steps" 
            :key="i"
          >
            <template v-slot:prepend>
              <v-avatar color="grey-darken-3" size="30" class="text-white mr-2">
                {{ i + 1 }}
              </v-avatar>
            </template>

            <v-list-item-title class="text-wrap">
              {{ step.instruction }}
            </v-list-item-title>
          </v-list-item>
        </v-list>

      </v-card-text>
    </v-card>
  </v-dialog>
</template>