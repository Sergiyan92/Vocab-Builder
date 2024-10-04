<script setup>
import LoginComponent from '@/components/Auth/Login/LoginComponent.vue'

import { useStore } from 'vuex'

const store = useStore()

const handleLoginUser = (data) => store.dispatch('loginUser', data)

</script>

<template>
  <LoginComponent @submit="handleLoginUser" />
  <!-- <div v-if="error" class="text-red-500">{{ error.message }}</div> -->
</template>
