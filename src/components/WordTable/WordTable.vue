<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

// Параметри для пагінації
const currentPage = ref(1)
const perPage = 7
const totalPages = computed(() => store.getters.getTotalPages) // Отримуємо з Vuex

// Діапазон для пагінації
const getPagesRange = () => {
  const total = totalPages.value
  const range = []

  // Додаємо поточну сторінку та дві наступні
  const start = Math.max(currentPage.value, 1)
  const end = Math.min(currentPage.value + 2, total - 1)

  for (let i = start; i <= end; i++) {
    range.push(i)
  }

  // Додаємо останню сторінку з многоточієм, якщо необхідно
  if (currentPage.value + 2 < total) {
    range.push('...', total)
  }

  return range
}

// Отримуємо слова при зміні сторінки
const store = useStore()
const words = computed(() => store.getters.getWordsList)

const fetchWords = (page) => {
  store.dispatch('getAllWords', { page, perPage })
}

// Оновлення слів при завантаженні компонента та зміні сторінки
onMounted(() => {
  fetchWords(currentPage.value)
})

const goToPage = (page) => {
  if (typeof page === 'number') {
    currentPage.value = page
    fetchWords(page)
  }
}

// Переходи на першу і останню сторінки
const goToFirstPage = () => {
  currentPage.value = 1
  fetchWords(1)
}

const goToLastPage = () => {
  currentPage.value = totalPages.value
  fetchWords(totalPages.value)
}

// Повернення на попередню сторінку
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1
    fetchWords(currentPage.value)
  }
}
</script>

<template>
  <table class="words-table mt-7">
    <thead>
      <tr>
        <th>Word</th>
        <th>Translation</th>
        <th>Category</th>
        <th>Progress</th>
        <th>Edit</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="word in words" :key="word.id">
        <td>{{ word.en }}</td>
        <td>{{ word.ua }}</td>
        <td>{{ word.category }}</td>
        <td>Progress</td>
        <td>Edit</td>
      </tr>
    </tbody>
  </table>

  <div class="pagination">
    <button @click="goToFirstPage" :disabled="currentPage === 1">«</button>
    <button @click="goToPreviousPage" :disabled="currentPage === 1">‹</button>

    <button
      v-for="page in getPagesRange()"
      :key="page"
      @click="goToPage(page)"
      :class="{ active: page === currentPage }"
    >
      {{ page }}
    </button>

    <button @click="goToLastPage" :disabled="currentPage === totalPages">»</button>
  </div>
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

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #fff;
  border: 1px solid #ccc;
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.pagination button.active {
  background-color: #85AA9F;
  color: white;
  border-color: #85AA9F;
}



.pagination button:disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
}
</style>
