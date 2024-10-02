<script setup>
import RegistrationComponent from '@/components/Auth/Register/RegistrationComponent.vue'
// import { useMutations } from '@/composables/useMutation';
// import {  useRouter } from 'vue-router';

// const router = useRouter()

// const {mutation,isLoading,error}=useMutations({})

</script>

<template>
  <RegistrationComponent @submit="console.log" />
</template>
