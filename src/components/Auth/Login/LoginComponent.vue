<script setup>
import { reactive, toRaw } from 'vue';
import { RouterLink } from 'vue-router'


const emit=defineEmits(['submit'])

const userData=reactive({
  email:'',
  password:''
})
</script>

<template>

    <form
    @submit.prevent="emit('submit',toRaw(userData))"
      class="w-[628px] bg-green bg-opacity-10 pt-[48px] pl-[64px] pr-[64px] pb-[48px] rounded-[30px] mt-[114px]"
    >
      <h1 class="text-black text-h1 font-semibold">Login</h1>
      <p class="text-black text-opacity-80 text-h2 font-regular">
        Please enter your login details to continue using our service:
      </p>
      <input
        type="text"
       v-model="userData.email"
        placeholder="Email"
        class="bg-green bg-opacity-10 w-full rounded-[15px] mb-5 mt-8 pl-[18px] pt-[16px] pb-[16px]"
      />
      <input
        type="text"
       v-model="userData.password"
        placeholder="Password"
        class="bg-green bg-opacity-10 w-full rounded-[15px] pl-[18px] pt-[16px] pb-[16px]"
      />
      <button type="submit" class="w-full rounded-[30px] bg-green text-main pt-4 pb-4 mt-8">
        Login
      </button>
      <router-link
        to="/auth/registration"
        class="flex justify-center underline text-black text-opacity-50 mt-4"
        >Register</router-link
      >
    </form>
  
</template>
