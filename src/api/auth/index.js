import { ClientFetch } from '../ClientFetch'

export const login = (data) => {
  return ClientFetch.post('/users/signin', data)
}
export const registration = (data) => {
  return ClientFetch.post('/users/signup', data)
}
export const current = () => {
  return ClientFetch.get('/users/current')
}
export const logout = () => {
  return ClientFetch.post('/users/signout')
}
