<script setup>
import LoginComponent from '@/components/Auth/Login/LoginComponent.vue';
// import { useMutations } from '@/composables/useMutation';
// import {  useRouter } from 'vue-router';

// const router = useRouter()

// const {mutation,isLoading,error}=useMutations({})
</script>

<template>
  <LoginComponent @submit="console.log"/>
</template>
