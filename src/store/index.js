import { useNotification } from '@kyvg/vue3-notification'
import { current, login, logout, registration } from '../api/auth'
import {
  addMyWord,
  addWord,
  deleteWord,
  editWord,
  getAllWords,
  getAllWordsOwn,
  getCategoryWord,
  getStatistics
} from '../api/wordApi/word'
import { router } from '../router'
import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      category: [],
      words: [],
      myWords: [],
      statistics: '',
      searchQuery: '', // Значення пошуку
      selectedCategory: 'all', // Поточна вибрана категорія
      selectedVerbType: 'regular', // Тип дієслова (regular/irregular)
      totalPages: null,
      showAddWordModal: false,
      showEditWordModal: false,
      user: ''
    }
  },
  actions: {
    async loadCategory({ commit }) {
      const notification = useNotification()
      try {
        const response = await getCategoryWord()
        commit('setCategory', response)
      } catch (error) {
        console.error('Error loading category:', error.response ? error.response.data : error)
        const errorMessage =
          error.response?.data?.message || 'loading category failed. Please try again.'
        notification.notify({
          title: 'Error loading category',
          text: errorMessage,
          type: 'error'
        })
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
      const notification = useNotification()
      try {
        const res = await current()
        commit('getCurrent', res.data)
      } catch (error) {
        console.error(
          'Error during loading current user:',
          error.response ? error.response.data : error
        )
        const errorMessage =
          error.response?.data?.message || 'Loading user info failed. Please try again.'
        notification.notify({
          title: 'Error loading current user',
          text: errorMessage,
          type: 'error'
        })
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
    async getAllWords({ commit }, { page = 1 } = {}) {
      try {
        const res = await getAllWords({ page })
        console.log(res)
        commit('getAllWords', res.data.results)
        commit('setTotalPages', res.data.totalPages)
      } catch (error) {
        console.error(error)
      }
    },
    async getAllWordsOwn({ commit }, { page = 1 } = {}) {
      const notification = useNotification()
      try {
        const res = await getAllWordsOwn({ page })
        console.log(res.data)
        commit('allWordsOwn', res.data.results)
        commit('setTotalPages', res.data.totalPages)
      } catch (error) {
        console.log('Error during getAllWords:', error)
        const errorMessage = error || 'Loading words failed. Please reaload.'
        notification.notify({
          title: 'Error during loading all words',
          text: errorMessage,
          type: 'error'
        })
      }
    },
    async addWord({ commit, dispatch }, data) {
      const notification = useNotification()
      try {
        const res = await addWord(data)

        commit('addWord', res.data)
        await dispatch('getAllWords')
      } catch (error) {
        console.error('Error adding word:', error)
        const errorMessage = error || 'Add word failed. Please try again'
        notification.notify({
          title: 'Error during add word',
          text: errorMessage,
          type: 'error'
        })
      }
    },
    async addMyWord({ commit }, { id, data }) {
      try {
        const res = await addMyWord(data, id)
        commit('addMyWord', res.data)
      } catch (error) {
        console.log(error)
      }
    },
    async editWord({ commit }, { id, data }) {
      const notification = useNotification()
      try {
        const res = await editWord(data, id) // Передаємо id та data

        commit('editWord', res.data)
      } catch (error) {
        console.error('Error editing word:', error)
        const errorMessage = error || 'Edit word failed. Please try again'
        notification.notify({
          title: 'Error during add word',
          text: errorMessage,
          type: 'error'
        })
      }
    },
    async deleteWord({ commit, dispatch }, { id, isDictionaryPage }) {
      const notification = useNotification()
      try {
        await deleteWord({ id })
        commit('deleteWord', id)
        if (isDictionaryPage) {
          dispatch('getAllWordsOwn')
        } else {
          dispatch('getAllWords')
        }
      } catch (error) {
        console.log('Error delete word:', error)
        const errorMessage = error || 'Delete word failed. Please try again'
        notification.notify({
          title: 'Error during delete word',
          text: errorMessage,
          type: 'error'
        })
      }
    },
    async getStatistic({ commit }) {
      const notification = useNotification()
      try {
        const res = await getStatistics()
        commit('getStatistic', res.data.totalCount)
      } catch (error) {
        console.log('Error load statistic:', error)
        const errorMessage = error || 'Load statistic failed. Please try again'
        notification.notify({
          title: 'Error during load statistic',
          text: errorMessage,
          type: 'error'
        })
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
    openEditModal(state) {
      state.showEditWordModal = true
    },
    closeEditModal(state) {
      state.showEditWordModal = false
    },
    setCategory(state, category) {
      state.category = category
    },
    getAllWords(state, wordsData) {
      state.words = wordsData
    },
    allWordsOwn(state, wordsData) {
      state.myWords = wordsData
    },
    addWord(state, newWord) {
      state.words.push(newWord) // Додаємо нове слово до списку слів
    },
    addMyWord(state, newWord) {
      state.myWords.push(newWord)
    },
    editWord(state, updatedWord) {
      const index = state.words.findIndex((word) => word._id === updatedWord._id)
      if (index !== -1) {
        // Оновлюємо слово в масиві
        state.words.splice(index, 1, updatedWord)
      }
    },
    deleteWord(state, id) {
      state.words = state.words.filter((word) => word._id !== id)
    },
    setSearchQuery(state, query) {
      state.searchQuery = query
    },
    setSelectedCategory(state, category) {
      state.selectedCategory = category
    },
    setSelectedVerbType: (state, verbType) => {
      state.selectedVerbType = verbType
    },
    getStatistic(state, statistics) {
      state.statistics = statistics
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages
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
    getTotalPages: (state) => state.totalPages,
    isAddWordModalOpen: (state) => state.showAddWordModal,
    isEditModalOpen: (state) => state.showEditWordModal,
    getStatistics: (state) => state.statistics,
    getWordsListOwn: (state) => state.words,
    getMyWords:(state) => state.myWords,    
    getFilteredWords: (state) => {
      let filteredWords = state.words

      if (state.searchQuery) {
        filteredWords = filteredWords.filter((word) =>
          word.en.toLowerCase().includes(state.searchQuery.toLowerCase())
        )
      }

      if (state.selectedCategory && state.selectedCategory !== 'all') {
        filteredWords = filteredWords.filter((word) => word.category === state.selectedCategory)
      }

      if (state.selectedCategory === 'verb' && state.selectedVerbType) {
        filteredWords = filteredWords.filter((word) => {
          if (state.selectedVerbType === 'regular') {
            return !word.isIrregular
          } else if (state.selectedVerbType === 'irregular') {
            return word.isIrregular
          }
        })
      }

      return filteredWords
    }
  }
})

export default store
