<script setup>
import { useUserStore } from '@/stores/user'
import { ref } from 'vue';

const userStore = useUserStore()
const isLoading = ref(false)

const handleGoogleLogin = async () => {
  isLoading.value = true
  try {
    await userStore.loginGoogle()
  } catch (error) {
    console.error("Eroare la login:", error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <v-container fluid class="fill-height bg-purple-lighten-5 align-center justify-center">
    <v-card width="400" class="pa-8 text-center rounded-lg" elevation="4">
      <v-avatar color="purple-lighten-4" size="80" class="mb-4">
        <v-icon icon="mdi-chef-hat" size="40" color="purple-darken-2"></v-icon>
      </v-avatar>
      
      <h2 class="mb-2">Bun venit!</h2>
      <p class="text-grey mb-6">Salvează-ți rețetele preferate</p>

      <v-btn
        block
        size="large"
        color="white"
        class="text-none font-weight-bold"
        prepend-icon="mdi-google"
        @click="handleGoogleLogin()"
        :loading="isLoading" 
        :disabled="isLoading"
      >
        Conectează-te cu Google
      </v-btn>
    </v-card>
  </v-container>
</template>