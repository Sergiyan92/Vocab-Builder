<script setup>
import { registration } from '@/api/auth'
import RegistrationComponent from '@/components/Auth/Register/RegistrationComponent.vue'
import { useMutations } from '@/composables/useMutation'
import { useRouter } from 'vue-router'

const router = useRouter()

const {
  mutation: handleRegisterUser,

  error
} = useMutations({
  mutationFn: (data) => registration(data),
  onSuccess: () => router.replace('/dictionary')
})
</script>

<template>
  <RegistrationComponent @submit="handleRegisterUser" />
  <div v-if="error" class="text-red-500">{{ error.message }}</div>
</template>
