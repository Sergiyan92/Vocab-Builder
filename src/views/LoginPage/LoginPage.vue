<script setup>
import { login } from '@/api/auth'
import LoginComponent from '@/components/Auth/Login/LoginComponent.vue'
import { useMutations } from '@/composables/useMutation'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
// const {
//   mutation: handleLoginUser,

//   error
// } = useMutations({
//   mutationFn: (data) => login(data),
//   onSuccess: () => router.replace('/dictionary')
// })
const handleLoginUser = async (data) => {
  try {
    const res = await login(data)
    console.log(res)
    const token = res.data.token // припустимо, це ваш токен
    localStorage.setItem('authToken', token)
   
    router.replace('/dictionary')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <LoginComponent @submit="handleLoginUser" />
  <!-- <div v-if="error" class="text-red-500">{{ error.message }}</div> -->
</template>
