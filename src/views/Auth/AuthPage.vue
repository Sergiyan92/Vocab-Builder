<script setup>
import { RouterView } from 'vue-router'
import LogoIcon from '@/components/icons/LogoIcon.vue'
import BaseLayout from '@/components/BaseLayout.vue'
</script>

<template>
  <BaseLayout>
    <section class="mt-6">
      <LogoIcon />
      <div class="flex justify-center">
        <router-view></router-view>
        <img
          src="../../assets/img/image.png"
          class="w-[498px] h-[475px] mt-[103px] ml-[80px] image"
        />
      </div></section
  ></BaseLayout>
</template>
<style scoped>
@media (max-width: 768px) {
  .image {
    display: block;
  }
}
@media (max-width: 1024px) {
  .image {
    display: none;
  }
}
</style>
