<template>
  <main class="layout h-full ml-[100px] mr-[100px]">
    <slot></slot>
  </main>
</template>

<style scoped>
@media (max-width: 768px) {
  .layout {
    width: 375;
    margin-left: 16px;
    margin-right: 16px;
  }
}
/* @media (max-width: 1024px) {
  .layout {
    width: 704px;
    margin-left: 32px;
    margin-right: 32px;
  }
} */
@media (max-width: 1024px) and (min-width: 769px) {
  .layout {
    width: 704px;
    margin-left: 32px;
    margin-right: 32px;
  }
}
</style>
