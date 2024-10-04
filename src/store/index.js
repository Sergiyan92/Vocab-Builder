import { login, registration } from '@/api/auth'
import { getCategoryWord } from '@/api/wordApi/word'
import { router } from '@/router'
import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      category: [],
      showAddWordModal: false,
      user: ''
    }
  },
  actions: {
    async loadCategory({ commit }) {
      try {
        const response = await getCategoryWord()
        commit('setCategory', response)
      } catch (error) {
        console.error('Error loading category:', error.response ? error.response.data : error)
      }
    },
    async loginUser({ commit }, data) {
      try {
        const res = await login(data)
        const { token } = res.data
        localStorage.setItem('authToken', token)
        router.replace('/dictionary')
        commit('getLogin', res.data)
      } catch (error) {
        console.log(error)
      }
    },
    async registerUser({ commit }, data) {
      try {
        const res = await registration(data)
        const { token } = res.data
        localStorage.setItem('authToken', token)
        router.replace('/dictionary')
        commit('getRegister', res.data)
      } catch (error) {
        console.log(error)
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
    },
    getRegister(state,registerData){
      state.user=registerData.user
    },
    getLogin(state, loginData) {
      state.user = loginData.user
    }
  },
  getters: {
    getUser: (state) => state.user,
    getCategoryList: (state) => state.category,
    isAddWordModalOpen: (state) => state.showAddWordModal
  }
})

export default store
