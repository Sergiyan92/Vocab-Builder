<script setup>
import { computed, reactive, ref, toRaw } from 'vue'
import { RouterLink } from 'vue-router'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import EyeOff from '@/components/icons/EyeOff.vue'
import ErrorIcon from '@/components/icons/ErrorIcon.vue'
import { useNotification } from '@kyvg/vue3-notification'

const notification = useNotification()

const emit = defineEmits(['submit'])

const userData = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

const showPassword = ref(false)

const validateEmail = () => {
  const emailPatern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
  if (userData.email.trim() === '') {
    errors.email = 'Email is required.'
    notification.notify({
      title: 'Validation Error',
      text: 'Email is required.',
      type: 'error'
    })
  } else if (!emailPatern.test(userData.email)) {
    errors.email = 'Invalid email format.'
    notification.notify({
      title: 'Validation Error',
      text: 'Invalid email format.',
      type: 'error'
    })
  } else {
    errors.email = ''
  }
}

const validatePassword = () => {
  const paternPassword = /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/
  if (userData.password.trim() === '') {
    errors.password = 'Password is required'
    notification.notify({
      title: 'Validation Error',
      text: 'Password is required',
      type: 'error'
    })
  } else if (!paternPassword.test(userData.password)) {
    errors.password = 'Password must contain at least 6 letters and 1 digit.'
    notification.notify({
      title: 'Validation Error',
      text: 'Password must contain at least 6 letters and 1 digit.',
      type: 'error'
    })
  } else {
    errors.password = ''
  }
}

const getBorderColor = (field, errField) => {
  if (!field) {
    return 'border'
  }
  return errField ? 'border-red-500' : 'border-green-500'
}

const emailBorderColor = computed(() => getBorderColor(userData.email, errors.email))
const passwordBorderColor = computed(() => getBorderColor(userData.password, errors.password))

const handleSubmit = () => {
  validateEmail()
  validatePassword()

  if (!errors.email && !errors.password) {
    emit('submit', toRaw(userData))
  }
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="w-[628px] bg-green bg-opacity-10 pt-[48px] pl-[64px] pr-[64px] pb-[48px] rounded-[30px] mt-[114px]"
  >
    <h1 class="text-black text-h1 font-semibold">Login</h1>
    <p class="text-black text-opacity-80 text-h2 font-regular">
      Please enter your login details to continue using our service:
    </p>
    <input
      type="email"
      @blur="validateEmail"
      v-model="userData.email"
      placeholder="Email"
      :class="[
        'bg-green bg-opacity-10 w-full rounded-[15px] mb-5 mt-8 pl-[18px] pt-[16px] pb-[16px]',
        emailBorderColor
      ]"
    />
    <span v-if="errors.email" class="text-red flex items-center"
      >{{ errors.email }}<ErrorIcon class="ml-2"
    /></span>
    <div class="relative">
      <input
        :type="showPassword ? 'text' : 'password'"
        @blur="validatePassword"
        v-model="userData.password"
        placeholder="Password"
        :class="[
          'bg-green bg-opacity-10 w-full rounded-[15px] pl-[18px] pt-[16px] pb-[16px]',
          passwordBorderColor
        ]"
      />
      <component
        :is="showPassword ? EyeOff : EyeIcon"
        @click="togglePassword"
        class="absolute top-1/2 right-4 transform -translate-y-1/2"
      />
    </div>
    <span v-if="errors.password" class="text-red flex items-center mt-4"
      >{{ errors.password }}<ErrorIcon class="ml-2"
    /></span>
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
<style scoped>
.border {
  border: none;
}
.border:hover {
  border: 1px solid#85aa9f;
}
.border-red-500 {
  border: 1px solid #ff0000;
}
.border-green-500 {
  border: 1px solid #008000;
}
</style>
