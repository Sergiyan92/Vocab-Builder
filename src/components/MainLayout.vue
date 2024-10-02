<script setup>
import HeaderComponent from './Header/HeaderComponent.vue'
</script>

<template>
  <main class="layout h-full ml-[100px] mr-[100px]">
    <HeaderComponent />

    <slot></slot>
  </main>
</template>

<style scoped>
@media (max-width: 1024px) {
  .layout {
    width: 704px;
    margin-left: 32px;
    margin-right: 32px;
  }
}
</style>
