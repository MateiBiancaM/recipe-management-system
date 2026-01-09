<script setup>
const menuItems = [
  { title: 'Acasă',   to: '/',           icon: 'mdi-home' },
  { title: 'Rețete',  to: '/recipes',    icon: 'mdi-book-open-variant' },
  { title: 'Login',   to: '/login',      icon: 'mdi-account' }
]
</script>

<template>
  <v-app>
    <v-app-bar color="purple-lighten-4" elevation="2">
      <v-app-bar-title>
        <v-icon icon="mdi-chef-hat" start></v-icon>
        Rețetar Digital
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <div>
        <v-btn v-for="item in menuItems" :key="item.to" :to="item.to" :prepend-icon="item.icon" variant="text">
          {{ item.title }}
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-0" >
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>