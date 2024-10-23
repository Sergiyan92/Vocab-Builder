<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import UKIcon from '../icons/UKIcon.vue'
import UkraineIcon from '../icons/UkraineIcon.vue'
import ActionMenu from '../ActionMenu/ActionMenu.vue'
import PaginationComponent from '../Pagination/PaginationComponent.vue'
import EditWordModal from '../EditWordModal/EditWordModal.vue'
import ProgresBar from '../ProgresBar/ProgresBar.vue'

const store = useStore()

const currentPage = ref(1)
const perPage = 7
const totalPages = computed(() => store.getters.getTotalPages)

const words = computed(() => store.getters.getFilteredWords)

const fetchWords = (page) => {
  store.dispatch('getAllWords', { page, perPage })
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
            <ProgresBar :progress="word.progress" />
          </td>
          <td class="text-h2 text-center pt-[22px] pl-[22px] pb-[22px]">
            <button type="button" @click="toggleActionMenu(word._id)">...</button>
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
