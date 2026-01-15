import { defineStore } from 'pinia'
import { ref } from 'vue'
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const user = ref(null) 
  const token = ref(null) 
  const router = useRouter()

  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    try {
      const result = await signInWithPopup(auth, provider)
      user.value = result.user
      token.value = await result.user.getIdToken() 
      
      router.push('/my-recipes') 
    } catch (error) {
      console.error("Eroare la logare:", error)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      user.value = null
      token.value = null
      console.log("Delogare reușită")
      router.push('/login')
    } catch (error) {
      console.error("Eroare la delogare:", error)
    }
  }

  return { user, token, loginGoogle, logout }
})