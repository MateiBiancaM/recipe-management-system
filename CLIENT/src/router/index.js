import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RecipesView from '../views/RecipesView.vue'
import LoginView from '../views/LoginView.vue'
import MyRecipesView from '../views/MyRecipesView.vue'
import AddRecipeView from '@/views/AddRecipeView.vue'
import EditRecipeView from '../views/EditRecipeView.vue'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: RecipesView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guestOnly: true }
    },
    {
      path: '/my-recipes',
      name: 'my-recipes',
      component: MyRecipesView,
      meta: { requiresAuth: true }
    },
    {
      path: '/add-recipe',
      name: 'add-recipe',
      component: AddRecipeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/edit-recipe/:id',
      name: 'edit-recipe',
      component: EditRecipeView,
      meta: { requiresAuth: true }
    }
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener(); 
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  const currentUser = await getCurrentUser();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isGuestOnly = to.matched.some(record => record.meta.guestOnly);

  if (requiresAuth && !currentUser) {
    next('/login');
  } 
  else if (isGuestOnly && currentUser) {
    next('/my-recipes');
  } 
  else {
    next();
  }
});

export default router