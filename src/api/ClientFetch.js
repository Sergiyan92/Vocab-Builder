import axios from 'axios'

axios.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmFkNmMyOWFhNTFhZWJhOTFlMzg0NiIsImlhdCI6MTcyNzc2NTc3MywiZXhwIjoxNzI3ODQ4NTczfQ.Ca-nXQSVQlzrgqQFjBCVOFMu62cNiE16ZE15_WYvdSo`

export const ClientFetch = axios.create({
  baseURL: 'https://vocab-builder-backend.p.goit.global/api'
})
