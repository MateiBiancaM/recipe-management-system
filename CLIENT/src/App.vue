<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Acasă</RouterLink> | 
      <RouterLink to="/recipes">Rețete</RouterLink> | 
    </nav>
  </header>
  <RouterView />
</template>