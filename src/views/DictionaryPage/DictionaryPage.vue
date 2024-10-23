<script setup>
import DashBord from '@/components/DashBord/DashBord.vue'
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
import MainLayout from '@/components/MainLayout.vue'
import TableWorld from '@/components/WordTable/TableWorld.vue';
import WordTable from '@/components/WordTable/WordTable.vue'
</script>

<template>
  <div class="background">
    <HeaderComponent />
    <MainLayout>
      <DashBord />
      <TableWorld/>
      <!-- <WordTable /> -->
    </MainLayout>
  </div>
</template>
<style scoped>
.background {
  background: rgb(133, 170, 159, 0.1);
}
</style>
