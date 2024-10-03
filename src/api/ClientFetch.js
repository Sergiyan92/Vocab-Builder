import axios from 'axios'

export const ClientFetch = axios.create({
  baseURL: 'https://vocab-builder-backend.p.goit.global/api'
})
ClientFetch.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken') // Отримання токена з local storage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
