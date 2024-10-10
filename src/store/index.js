import { useNotification } from '@kyvg/vue3-notification'
import { current, login, logout, registration } from '../api/auth'
import { addWord, getAllWords, getCategoryWord } from '../api/wordApi/word'
import { router } from '../router'
import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      category: [],
      words: [],
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
      const notification = useNotification()
      try {
        const res = await login(data)
        const { token } = res.data
        localStorage.setItem('authToken', token)
        router.replace('/dictionary')
        commit('getLogin', res.data)
      } catch (error) {
        console.error('Error during login:', error.response ? error.response.data : error)
        const errorMessage = error.response?.data?.message || 'Login failed. Please try again.'
        notification.notify({
          title: 'Error login',
          text: errorMessage,
          type: 'error'
        })
      }
    },
    async registerUser({ commit }, data) {
      const notification = useNotification()
      try {
        const res = await registration(data)
        const { token } = res.data
        localStorage.setItem('authToken', token)
        router.replace('/dictionary')
        commit('getRegister', res.data)
      } catch (error) {
        console.error('Error during registration:', error.response ? error.response.data : error)
        const errorMessage =
          error.response?.data?.message || 'Registration failed. Please try again.'
        notification.notify({
          title: 'Error registration',
          text: errorMessage,
          type: 'error'
        })
      }
    },
    async currentUser({ commit }) {
      try {
        const res = await current()
        commit('getCurrent', res.data)
      } catch (error) {
        console.log(error)
      }
    },
    async logoutUser({ commit }) {
      try {
        await logout()
        router.replace('/auth/login')
        localStorage.removeItem('authToken')
        commit('getLogout')
      } catch (error) {
        console.log(error)
      }
    },
    async getAllWords({ commit }) {
      try {
        const res = await getAllWords()
        console.log(res.data.results)
        commit('allWords', res.data.results)
      } catch (error) {
        console.log(error)
      }
    },
    async addWord({ commit }, data) {
      try {
        const res = await addWord(data)
        console.log(res.data)
        commit('addWord', res.data)
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
    allWords(state, wordsData) {
      state.words = wordsData
    },
    getRegister(state, registerData) {
      state.user = registerData.user
    },
    getLogin(state, loginData) {
      state.user = loginData.user
    },
    getCurrent(state, currentUser) {
      state.user = currentUser.name
    },
    getLogout(state) {
      state.category = []
      state.user = ''
    }
  },
  getters: {
    getUser: (state) => state.user,
    getCategoryList: (state) => state.category,
    getWordsList: (state) => state.words,
    isAddWordModalOpen: (state) => state.showAddWordModal
  }
})

export default store
