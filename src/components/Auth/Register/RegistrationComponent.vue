<script setup>
import ErrorIcon from '@/components/icons/ErrorIcon.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import EyeOff from '@/components/icons/EyeOff.vue'
import { useNotification } from '@kyvg/vue3-notification'
import { computed, reactive, ref, toRaw } from 'vue'
import { RouterLink } from 'vue-router'

const emit = defineEmits(['submit'])

const notification = useNotification()

const userData = reactive({
  name: '',
  email: '',
  password: ''
})

const errors = reactive({
  name: '',
  email: '',
  password: ''
})

const showPassword = ref(false)
const passwordSuccess = ref(false)

const validateName = () => {
  if (userData.name.trim() === '') {
    errors.name = 'Name is required.'
    notification.notify({
      title: 'Validation Error',
      text: 'Name is required.',
      type: 'error'
    })
  } else {
    errors.name = ''
  }
}

const validateEmail = () => {
  const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
  if (userData.email.trim() === '') {
    errors.email = 'Email is required.'
    notification.notify({
      title: 'Validation Error',
      text: 'Email is required.',
      type: 'error'
    })
  } else if (!emailPattern.test(userData.email)) {
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
  const passwordPattern = /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/
  if (userData.password.trim() === '') {
    errors.password = 'Password is required.'
    notification.notify({
      title: 'Validation Error',
      text: 'Password is required.',
      type: 'error'
    })
    passwordSuccess.value = false
  } else if (!passwordPattern.test(userData.password)) {
    errors.password = 'Password must contain at least 6 letters and 1 digit.'
    notification.notify({
      title: 'Validation Error',
      text: 'Password must contain at least 6 letters and 1 digit.',
      type: 'error'
    })
    passwordSuccess.value = false
  } else {
    errors.password = ''
    passwordSuccess.value = true
  }
}

const getBorderColor = (field,errField) => {
  if (!field) {
    return 'border'
  }
  return errField ? 'border-red-500' : 'border-green-500'
}

const passwordBorderColor=computed(()=>getBorderColor(userData.password, errors.password))
const emailBorderColor=computed(()=>getBorderColor(userData.email,errors.email))
const nameBorderColor=computed(()=>getBorderColor(userData.name,errors.name))

const handleSubmit = () => {
  validateEmail()
  validateName()
  validatePassword()

  if (!errors.name && !errors.password && !errors.email) {
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
    <h1 class="text-black text-h1 font-semibold">Register</h1>
    <p class="text-black text-opacity-80 text-h2 font-regular">
      To start using our services, please fill out the registration form below. All fields are
      mandatory:
    </p>

    <input
      type="text"
      @blur="validateName"
      v-model="userData.name"
      placeholder="Name"
      :class="['bg-green bg-opacity-10 w-full rounded-[15px] mb-5 mt-8 pl-[18px] pt-[16px] pb-[16px]',nameBorderColor]"
    />
    <span v-if="errors.name" class="text-red flex items-center">
      {{ errors.name }} <ErrorIcon />
    </span>

    <input
      type="email"
      @blur="validateEmail"
      v-model="userData.email"
      placeholder="Email"
      :class="['bg-green bg-opacity-10 w-full rounded-[15px] mb-5 pl-[18px] pt-[16px] pb-[16px]',emailBorderColor]"
    />
    <span v-if="errors.email" class="flex items-center text-red">
      {{ errors.email }}<ErrorIcon />
    </span>

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
        class="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
      />
    </div>
    <span v-if="errors.password" class="flex items-center text-red mt-4">
      {{ errors.password }}<ErrorIcon />
    </span>
    <span v-if="passwordSuccess" class="text-success">Success password</span>

    <button type="submit" class="w-full rounded-[30px] bg-green text-main pt-4 pb-4 mt-8">
      Register
    </button>

    <router-link
      to="/auth/login"
      class="flex justify-center underline text-black text-opacity-50 mt-4"
    >
      Login
    </router-link>
  </form>
</template>

<style scoped>
.border {
  border: none;
}
.border:hover{
  border: 1px solid #85aa9f;
}
.border-red-500 {
  border: 1px solid red;
}
.border-green-500 {
  border: 1px solid #008000;
}
</style>
