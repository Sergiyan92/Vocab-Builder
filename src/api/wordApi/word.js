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
