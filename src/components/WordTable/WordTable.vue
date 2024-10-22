<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import UKIcon from '../icons/UKIcon.vue'
import UkraineIcon from '../icons/UkraineIcon.vue'
import DeleteIcon from '../icons/DeleteIcon.vue'
import EditIcon from '../icons/EditIcon.vue'
import ProgresBar from '../ProgresBar/ProgresBar.vue'
import EditWordModal from '../EditWordModal/EditWordModal.vue'
// Параметри для пагінації
const store = useStore()

const currentPage = ref(1)
const perPage = 7
const totalPages = computed(() => store.getters.getTotalPages) // Отримуємо з Vuex

const getPagesRange = () => {
  const total = totalPages.value


  // Додаємо поточну сторінку та дві наступні
  const start = Math.max(currentPage.value, 1)
  const end = Math.min(currentPage.value + 2, total - 1)

  const range = Array.from({ length: end - start + 1 }, (_, i) => start + i)


  // Додаємо останню сторінку з многоточієм, якщо необхідно
  if (currentPage.value + 2 < total) {
    range.push('...', total)
  }

  return range
}

// Отримуємо слова при зміні сторінки
const words = computed(() => store.getters.getFilteredWords)

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

const isActionMenuOpen = ref({})
const toggleActionMenu = (id) => {
  isActionMenuOpen.value[id] = !isActionMenuOpen.value[id]
}

const wordProgress = ref(75)

const deleteWord = (id) => {
  if (id) {
    store.dispatch('deleteWord', id)
  } else {
    console.error('Word ID is undefined')
  }
}
const selectedWord = ref(null)

const openEditModal = (word) => {
  selectedWord.value = word
  store.commit('openEditModal')
}

const handleEditWord = (word) => {
  if (!word._id) {
    console.error('Word ID is missing:', word)
    return // Вийти з функції, якщо ID відсутній
  }

  const { _id, ...data } = word // Дістаємо id і дані для редагування окремо
  delete data.owner
  delete data.progress

  store.dispatch('editWord', { data, id: _id }) // Виклик дії з правильними параметрами
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
          <td class="text-h2 text-left pt-[22px] pl-[22px] pb-[22px]">
            <ProgresBar :progress="wordProgress" />
          </td>
          <td class="text-h2 text-center pt-[22px] pl-[22px] pb-[22px]">
            <button type="button" @click="toggleActionMenu(word._id)">...</button>
            <div v-if="isActionMenuOpen[word._id]">
              <div class="w-[124px] h-[80px] flex flex-col bg-main absolute pt-3 pb-3 pl-6 pr-6">
                <button
                  type="button"
                  class="flex items-center text-black font-standart text-[16px] mb-2"
                  @click="deleteWord(word._id)"
                >
                  <DeleteIcon class="mr-2" /> Delete
                </button>
                <button
                  type="button"
                  class="flex items-center text-black font-standart text-[16px]"
                  @click="openEditModal(word)"
                >
                  <EditIcon class="mr-2" /> Edit
                </button>
              </div>
            </div>
          </td>
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
  <EditWordModal v-if="selectedWord" :word="selectedWord" @submit="handleEditWord" />
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
