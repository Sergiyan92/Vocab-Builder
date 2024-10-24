<script setup lang="ts">
import BaseLayout from '@/components/BaseLayout.vue'
import DashBord from '@/components/DashBord/DashBord.vue'
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
import WordTable from '@/components/WordTable/WordTable.vue';
</script>

<template>
  <HeaderComponent />
  <BaseLayout>
    <DashBord />
    <WordTable/>
  </BaseLayout>
</template>
