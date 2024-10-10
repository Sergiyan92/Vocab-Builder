<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

onMounted(() => {
  store.dispatch('getAllWords')
})

const store = useStore()
const words = computed(() => store.getters.getWordsList)
</script>

<template>
  <table class="words-table mt-7">
    <thead>
      <tr>
        <th>Word</th>
        <th>Translation</th>
        <th>Category</th>
        <th>Progress</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="word in words" :key="word.id">
        <td>{{ word.en }}</td>
        <td>{{ word.ua }}</td>
        <td>{{ word.category }}</td>
        <td>Progress</td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.words-table {
  width: 100%;
  border-collapse: collapse;
}

.words-table th, 
.words-table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
}

.words-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.words-table td:last-child {
  width: 136px; /* Фіксована ширина для останньої колонки */
}
</style>
