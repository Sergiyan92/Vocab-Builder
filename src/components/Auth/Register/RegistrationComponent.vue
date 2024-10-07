<script setup>
import EyeIcon from '@/components/icons/EyeIcon.vue'
import EyeOff from '@/components/icons/EyeOff.vue'
import { reactive, ref, toRaw } from 'vue'
import { RouterLink } from 'vue-router'

const emit = defineEmits(['submit'])

const userData = reactive({
  name: '',
  email: '',
  password: ''
})

const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <form
    @submit.prevent="emit('submit', toRaw(userData))"
    class="w-[628px] bg-green bg-opacity-10 pt-[48px] pl-[64px] pr-[64px] pb-[48px] rounded-[30px] mt-[114px]"
  >
    <h1 class="text-black text-h1 font-semibold">Register</h1>
    <p class="text-black text-opacity-80 text-h2 font-regular">
      To start using our services, please fill out the registration form below. All fields are
      mandatory:
    </p>
    <input
      type="text"
      v-model="userData.name"
      placeholder="Name"
      class="bg-green bg-opacity-10 w-full rounded-[15px] mb-5 mt-8 pl-[18px] pt-[16px] pb-[16px]"
    />
    <input
      type="email"
      v-model="userData.email"
      placeholder="Email"
      class="bg-green bg-opacity-10 w-full rounded-[15px] mb-5 pl-[18px] pt-[16px] pb-[16px]"
    />
    <div class="relative">
      <input
        :type="showPassword ? 'text' : 'password'"
        v-model="userData.password"
        placeholder="Password"
        class="bg-green bg-opacity-10 w-full rounded-[15px] pl-[18px] pt-[16px] pb-[16px]"
      />
      <component
        :is="showPassword ? EyeIcon : EyeOff"
        @click="togglePassword"
        class="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
      />
    </div>

    <button type="submit" class="w-full rounded-[30px] bg-green text-main pt-4 pb-4 mt-8">
      Register
    </button>
    <router-link
      to="/auth/login"
      class="flex justify-center underline text-black text-opacity-50 mt-4"
      >Login</router-link
    >
  </form>
</template>
