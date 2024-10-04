<script setup>
import RegistrationComponent from '@/components/Auth/Register/RegistrationComponent.vue'
import { useStore } from 'vuex'

const store = useStore()

const handleRegisterUser = (data) => store.dispatch('registerUser', data)
</script>

<template>
  <RegistrationComponent @submit="handleRegisterUser" />
  <!-- <div v-if="error" class="text-red-500">{{ error.message }}</div> -->
</template>
