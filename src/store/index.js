import { createStore } from 'vuex'
import { getCategoryWord } from '@/api/wordApi/word'

const store = createStore({
  state() {
    return {
      category: [],
      showAddWordModal: false
    }
  },
  actions: {
    async loadCategory({ commit }) {
      try {
        const response = await getCategoryWord()
        commit('setCategory', response.data)
      } catch (error) {
        console.error(error)
      }
    }
  },
  mutations: {
    openAddWordModal(state) {
      state.showAddWordModal = true
    },
    closeAddWordModal(state) {
      state.showAddWordModal = false
    },
    setCategory(state, category) {
      state.category = category
    }
  },
  getters: {
    getCategoryList: (state) => state.category,
    isAddWordModalOpen: (state) => state.showAddWordModal
  }
})

export default store
