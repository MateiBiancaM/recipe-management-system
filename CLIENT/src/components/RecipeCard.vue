<script setup>
defineProps({
  recipe: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div style="border: 1px solid black; margin: 10px; padding: 10px;">
    <h3>{{ recipe.title }}</h3>
    <p>Nivel: <strong>{{ recipe.difficulty }}</strong></p>
    <small>ID: {{ recipe.id }}</small>
  </div>
</template>