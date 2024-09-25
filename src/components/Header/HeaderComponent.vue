<script setup>
import LogoIcon from '../icons/LogoIcon.vue'
import { RouterLink, RouterView } from 'vue-router'
import BaseLayout from '../BaseLayout.vue'
import BurgerMenu from '../icons/BurgerMenu.vue'
import ArrowRight from '../icons/ArrowRight.vue'
import UserIcon from '../icons/UserIcon.vue'
import { ref } from 'vue'
import CloseIcon from '../icons/CloseIcon.vue'

const isMenuOpen = ref(false) // Стан для відкриття/закриття бургер-меню
</script>

<template>
  <BaseLayout>
    <header
      class="flex container items-center justify-between w-full max-w-[1240px] mt-[20px] mb-[20px]"
    >
      <LogoIcon />
      <!-- Навігація для десктопу, схована на планшетах -->
      <nav class="hidden md:flex items-center">
        <router-link
          class="text-black text-medium font-standart"
          exact-active-class="text-main bg-green pt-[12px] pb-[12px] pl-[20px] pr-[20px] rounded-2xl text-medium"
          to="/dictionary"
          >Dictionary</router-link
        >
        <router-link
          class="text-black text-medium ml-[28px] mr-[28px]"
          exact-active-class="text-main bg-green pt-[12px] pb-[12px] pl-[20px] pr-[20px] rounded-2xl text-medium"
          to="/recommend"
          >Recommend</router-link
        >
        <router-link
          class="text-black text-medium"
          exact-active-class="text-main bg-green pt-[12px] pb-[12px] pl-[20px] pr-[20px] rounded-2xl text-medium"
          to="/training"
          >Training</router-link
        >
      </nav>

      <!-- Бургер-меню для планшетів і мобільних пристроїв -->

      <!-- Інформація про користувача -->
      <div class="flex items-center">
        <h3 class="text-black">Irina</h3>
        <div
          class="bg-green w-[48px] h-[48px] rounded-full flex items-center justify-center ml-[10px] mr-[16px]"
        >
          <UserIcon class="fill-main" />
        </div>
        <div class="md:hidden flex items-center">
          <BurgerMenu @click="isMenuOpen = !isMenuOpen" />
        </div>

        <div class="hidden md:flex logout items-center">
          Log out <ArrowRight class="ml-[6px] stroke-black" />
        </div>
      </div>
    </header>

    <!-- Бургер-меню (мобільне/планшетне відображення навігації) -->
    <transition name="fade">
      <div v-if="isMenuOpen" class="fixed top-0 left-[400px] w-[300px] h-full bg-green z-50">
        <div class="flex items-center ml-[32px] mt-[20px]">
          <h3 class="text-main">Irina</h3>
          <div
            class="bg-main w-[48px] h-[48px] rounded-full flex items-center justify-center ml-[10px] mr-[16px]"
          >
            <UserIcon class="fill-green" />
          </div>
          <button type="button" @click="isMenuOpen = !isMenuOpen" class="ml-[83px]">
            <CloseIcon />
          </button>
        </div>

        <div class="flex flex-col items-center mt-[40px]">
          <router-link
            class="text-main text-medium font-standart mb-[20px]"
            exact-active-class="text-black  bg-main pt-[12px] pb-[12px] pl-[20px] pr-[20px] rounded-2xl text-medium"
            to="/dictionary"
            >Dictionary</router-link
          >
          <router-link
            class="text-main text-medium mb-[20px]"
            exact-active-class="text-black bg-main pt-[12px] pb-[12px] pl-[20px] pr-[20px] rounded-2xl text-medium"
            to="/recommend"
            >Recommend</router-link
          >
          <router-link
            class="text-main text-medium mb-[20px]"
            exact-active-class="text-black bg-main pt-[12px] pb-[12px] pl-[20px] pr-[20px] rounded-2xl text-medium"
            to="/training"
            >Training</router-link
          >
          <div class="flex text-main items-center">
            Log out <ArrowRight class="ml-[6px] stroke-main" />
          </div>
        </div>
      </div>
    </transition>

    <router-view></router-view>
  </BaseLayout>
</template>

<style scoped>
/* Медиа-запит для планшетів */
@media (max-width: 1024px) {
  nav {
    display: none; /* Приховуємо навігацію */
  }
  .logout {
    display: none;
  }
}

/* Анімація для бургер-меню */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
