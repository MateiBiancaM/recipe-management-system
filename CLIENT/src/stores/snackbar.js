import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSnackbarStore = defineStore('snackbar', () => {
  const show = ref(false);
  const text = ref('');
  const color = ref('success'); 

  function showSuccess(message) {
    text.value = message;
    color.value = 'success';
    show.value = true;
  }

  function showError(message) {
    text.value = message;
    color.value = 'red';
    show.value = true;
  }

  return { show, text, color, showSuccess, showError };
});