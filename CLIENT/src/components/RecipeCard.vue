<script setup>
defineProps({
  recipe: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div style="border: 1px solid black; margin: 20px; padding: 10px;">
    <h2>{{ recipe.title }}</h2>
    <p><i>{{ recipe.description }}</i></p>

    <p><strong>Dificultate:</strong> {{ recipe.details?.difficulty }}</p>
    <p><strong>Timp Total:</strong> {{ (recipe.details?.time?.prep || 0) + (recipe.details?.time?.cook || 0) }} minute</p>

    <hr>

    <h3>Ingrediente:</h3>
    <ul>
      <li v-for="(ing, index) in recipe.ingredients" :key="index">
        {{ ing.quantity }} - {{ ing.name }}
      </li>
    </ul>

    <h3>Mod de preparare:</h3>
    <ol>
      <li v-for="(step, index) in recipe.steps" :key="index">
        {{ step.instruction }}
      </li>
    </ol>

    <small>ID: {{ recipe.id }} | User: {{ recipe.userId }}</small>
  </div>
</template>