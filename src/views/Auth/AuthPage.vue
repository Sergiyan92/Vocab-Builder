<script setup>
import { RouterView } from 'vue-router'
import LogoIcon from '@/components/icons/LogoIcon.vue'
import BaseLayout from '@/components/BaseLayout.vue'
</script>

<template>
  <BaseLayout>
    <section class="mt-6">
      <LogoIcon />
      <div class="flex">
        <router-view></router-view>
        <img src="../../assets/img/image.png" class="w-[498px] h-[475px] mt-[103px] ml-[80px]" />
      </div></section
  ></BaseLayout>
</template>
