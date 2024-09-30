import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      showAddWordModal: false
    }
  },
  mutations: {
    openAddWordModal(state) {
      state.showAddWordModal = true
    },
    closeAddWordModal(state) {
      state.showAddWordModal = false
    }
  }
})

export default store
