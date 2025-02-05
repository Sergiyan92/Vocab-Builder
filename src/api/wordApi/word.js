import { ClientFetch } from '../ClientFetch'

export const getCategoryWord = () => {
  const token = localStorage.getItem('authToken')

  if (!token) {
    console.error('Токен не знайдено. Виконується перенаправлення на сторінку входу...')

    return Promise.reject(new Error('Unauthorized'))
  }

  return ClientFetch.get('/words/categories')
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(
        'Помилка завантаження категорії:',
        error.response ? error.response.data : error.message
      )
    })
}
export const addWord = (data) => {
  return ClientFetch.post('/words/create', data)
}
export const addMyWord = (data, id) => {
  return ClientFetch.post(`/words/add/${id}`, data)
}
export const editWord = (data, id) => {
  return ClientFetch.patch(`/words/edit/${id}`, data)
}
export const getAllWords = ({ page }) => {
  return ClientFetch.get(`/words/all?page=${page}`)
}
export const getAllWordsOwn = ({ page }) => {
  return ClientFetch.get(`/words/own?page=${page}`)
}
export const getStatistics = () => {
  return ClientFetch.get('/words/statistics')
}
export const deleteWord = ({ id }) => {
  return ClientFetch.delete(`/words/delete/${id}`)
}
