<script setup>
  import { useUserStore } from './stores/user';
  import { onMounted } from 'vue';
  import { auth } from './firebase';
  import { onAuthStateChanged } from 'firebase/auth';

  const userStore = useUserStore();
  
  const menuItems = [
    { title: 'Acasă',   to: '/',           icon: 'mdi-home' },
    { title: 'Rețete',  to: '/recipes',    icon: 'mdi-book-open-variant' },
  ]

  const getInitials = (name) => {
    if (!name) return 'User'; 
    const parts = name.split(' ');
    let initials = parts[0][0];
    if (parts.length > 1) {
      initials += parts[parts.length - 1][0]; 
    }
    return initials.toUpperCase();
  }

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userStore.user = user;
        userStore.token = user.accessToken;
      } else {
        userStore.user = null;
        userStore.token = null;
      }
    });
  });
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
      
      <v-btn 
        v-if="!userStore.user" 
        to="/login" 
        prepend-icon="mdi-login"
        variant="text"
      >
        Login
      </v-btn>

      <v-menu v-else>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" class="ml-2">
            <v-avatar color="purple-darken-2" class="border">
              <span class="text font-weight text-white">
                {{ getInitials(userStore.user.displayName) }}
              </span>
            </v-avatar>
          </v-btn>
        </template>

        <v-list width="250">
          <v-list-item>
            <v-list-item-title class="font-weight-bold text-purple">
              {{ userStore.user.displayName }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-caption">
              {{ userStore.user.email }}
            </v-list-item-subtitle>
          </v-list-item>
          
          <v-divider class="my-2"></v-divider>

          <v-list-item to="/my-recipes" link>
            <template v-slot:prepend>
              <v-icon icon="mdi-notebook-edit" color="purple"></v-icon>
            </template>
            <v-list-item-title>Rețetele Mele</v-list-item-title>
          </v-list-item>

          <v-divider class="my-2"></v-divider>

          <v-list-item @click="userStore.logout()">
            <template v-slot:prepend>
              <v-icon icon="mdi-logout" color="red"></v-icon>
            </template>
            <v-list-item-title class="text-red">Ieșire din cont</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-0" >
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>