<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import UKIcon from '../icons/UKIcon.vue'
import UkraineIcon from '../icons/UkraineIcon.vue'
import ActionMenu from '../ActionMenu/ActionMenu.vue'
import PaginationComponent from '../Pagination/PaginationComponent.vue'
import EditWordModal from '../EditWordModal/EditWordModal.vue'
import ProgresBar from '../ProgresBar/ProgresBar.vue'
import { useRoute } from 'vue-router'
import ArrowRight from '../icons/ArrowRight.vue'

const store = useStore()
const route = useRoute()

const isRecommendPage = computed(() => route.path === '/recommend')
const isDictionaryPage = computed(() => route.path === '/dictionary')

const currentPage = ref(1)
const perPage = 7
const totalPages = computed(() => store.getters.getTotalPages)

const words = computed(() => store.getters.getFilteredWords)

const fetchWords = (page) => {
  if (route.path === '/recommend') {
    store.dispatch('getAllWords')
  } else if (route.path === '/dictionary') {
    store.dispatch('getAllWordsOwn', { page, perPage })
  }
}

onMounted(() => {
  fetchWords(currentPage.value)
})

const isActionMenuOpen = ref({})
const toggleActionMenu = (id) => {
  isActionMenuOpen.value[id] = !isActionMenuOpen.value[id]
}

const selectedWord = ref(null)

const openEditModal = (word) => {
  selectedWord.value = word // Ensure the whole word object is passed
  store.commit('openEditModal')
}

const deleteWord = (id) => {
  store.dispatch('deleteWord', id)
}
const handleAddMyWord = (word) => {
  const { _id, ...data } = word
  store.dispatch('addMyWord', { data, id: _id })
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
const updatePage = (page) => {
  currentPage.value = page
  fetchWords(page)
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
          <th v-if="isDictionaryPage" class="h-[72px] w-[260px] text-left no-border-right">
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
          <td v-if="isDictionaryPage" class="text-h2 text-left pt-[22px] pl-[22px] pb-[22px]">
            <ProgresBar :progress="word.progress" />
          </td>
          <td class="text-h2 text-center pt-[22px] pl-[22px] pb-[22px]">
            <button
              type="button"
              v-if="isRecommendPage"
              class="w-[208px] flex items-center text-left text-[16px] text-black"
              @click="handleAddMyWord(word)"
            >
              Add to dictionary <ArrowRight class="stroke-green ml-2" />
            </button>
            <button v-if="isDictionaryPage" type="button" @click="toggleActionMenu(word._id)">
              ...
            </button>
            <ActionMenu
              :isOpen="isActionMenuOpen[word._id]"
              :wordId="word._id"
              @deleteWord="deleteWord"
              @editWord="openEditModal(word)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <PaginationComponent
    :currentPage="currentPage"
    :totalPages="totalPages"
    @updatePage="updatePage"
  />

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
