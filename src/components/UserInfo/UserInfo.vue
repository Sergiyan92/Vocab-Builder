<script setup lang="ts">
import ArrowRight from '../icons/ArrowRight.vue'
import UserIcon from '../icons/UserIcon.vue'
</script>

<template>
  <div class="flex items-center">
    <h3>Irina</h3>
    <div
      class="bg-green w-[48px] h-[48px] rounded-full flex items-center justify-center ml-[10px] mr-[16px]"
    >
      <UserIcon />
    </div>
    <div class="flex items-center">Log out <ArrowRight class="ml-[6px]" /></div>
  </div>
</template>
