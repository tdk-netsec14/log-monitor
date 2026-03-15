import axios from 'axios'
import { getToken } from '../utils/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const fetchLogs = async (params = {}) => {
  const res = await api.get('/api/logs', { params })
  return res.data
}

export const createLog = async (logData) => {
  const res = await api.post('/api/logs', logData)
  return res.data.data
}

export const loginUser = async (username, password) => {
  const res = await api.post('/api/auth/login', { username, password })
  return res.data
}

export const registerUser = async (username, password) => {
  const res = await api.post('/api/auth/register', { username, password })
  return res.data
}