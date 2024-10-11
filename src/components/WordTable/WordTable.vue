<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import UKIcon from '../icons/UKIcon.vue'
import UkraineIcon from '../icons/UkraineIcon.vue'

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
  <div class="p-[18px] bg-main rounded-[15px] mt-7">
    <table class="words-table">
      <thead>
        <tr>
          <th class="w-[280px]">
            <div class="flex items-center justify-start">
              <span class="text-h2 pt-[22px] pl-[22px] pb-[22px] text-black font-standart"
                >Word</span
              >
              <UKIcon class="ml-[152px]" />
            </div>
          </th>
          <th class="w-[280px]">
            <div class="flex items-center justify-start">
              <span class="text-h2 pt-[22px] pl-[22px] pb-[22px] text-black font-standart"
                >Translation</span
              >
              <UkraineIcon class="ml-[91px]" />
            </div>
          </th>
          <th class="h-[72px] w-[260px] text-left">
            <span class="text-h2 pt-[22px] pl-[22px] pb-[22px] text-black font-standart"
              >Category</span
            >
          </th>
          <th class="h-[72px] w-[260px] text-left no-border-right">
            <span class="text-h2 pt-[22px] pl-[22px] pb-[22px] text-black font-standart"
              >Progress</span
            >
          </th>
          <th class="no-border-right"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="word in words" :key="word.id">
          <td class="text-h2 text-left pt-[22px] pl-[22px] pb-[22px]">{{ word.en }}</td>
          <td class="text-h2 text-left pt-[22px] pl-[22px] pb-[22px]">{{ word.ua }}</td>
          <td class="text-h2 text-left pt-[22px] pl-[22px] pb-[22px]">{{ word.category }}</td>
          <td class="text-h2 text-left pt-[22px] pl-[22px] pb-[22px]">Progress</td>
          <td class="text-h2 text-left pt-[22px] pl-[22px] pb-[22px]"></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="pagination">
    <button class="text-black" @click="goToFirstPage" :disabled="currentPage === 1">«</button>
    <button class="text-black" @click="goToPreviousPage" :disabled="currentPage === 1">‹</button>

    <button
      v-for="page in getPagesRange()"
      :key="page"
      @click="goToPage(page)"
      :class="{ active: page === currentPage }"
    >
      {{ page }}
    </button>

    <button class="text-black" @click="goToLastPage" :disabled="currentPage === totalPages">
      »
    </button>
  </div>
</template>

<style scoped>
.words-table {
  width: 100%;
  border-collapse: collapse;
  padding-top: 18px;
  background: #fcfcfc;
  border-radius: 15px;
}

.words-table th,
.words-table td {
  border: 1px solid #ccc;
  border-left: 0;
  border-radius: 15px; /* Прибираємо лівий бордер */
}

.words-table th {
  background-color: #f5f5f5;
  font-weight: bold;
  border-top: 0; /* Прибираємо верхній бордер */
}
.words-table th:last-child {
  border-right: 0;
}
.words-table td {
  border-top: 0; /* Прибираємо верхній бордер у клітинок тіла */
}

.words-table td:last-child {
  width: 136px;
  border-right: 0; /* Прибираємо правий бордер у останній колонці */
}

.no-border-right {
  border-right: 0; /* Прибирає правий бордер у заголовка */
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 28px;
  padding-bottom: 48px;
}

.pagination button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(18, 20, 23, 0.1);
  border-radius: 8px;
  width: 32px;
  height: 32px;
  background-color: #fff;
  font-size: 13px;
  font-weight: 600;
  margin: 0 5px;
  padding: 7px 13px;
  cursor: pointer;
}

.pagination button.active {
  background-color: rgb(133, 170, 159);
  color: white;
  border-color: #85aa9f;
}

.pagination button:disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
}
</style>
