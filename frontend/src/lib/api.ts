import axios from 'axios'
import { User, UserProfileUpdate } from '../types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Add response interceptor to handle validation errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle validation errors from Pydantic
    if (error.response?.data?.detail && Array.isArray(error.response.data.detail)) {
      const validationErrors = error.response.data.detail
      const errorMessages = validationErrors.map((err: any) => {
        if (err.loc && err.msg) {
          const field = err.loc[err.loc.length - 1]
          return `${field}: ${err.msg}`
        }
        return err.msg || 'Validation error'
      })
      error.message = errorMessages.join(', ')
    }
    return Promise.reject(error)
  }
)

export const apiClient = {
  auth: {
    login: async (email: string, password: string) => {
      const response = await api.post('/auth/login', { email, password })
      return response.data
    },
    register: async (email: string, password: string, role: string = 'student') => {
      const response = await api.post('/auth/register', { email, password, role })
      return response.data
    },
  },
  users: {
    getMe: async (): Promise<User> => {
      const response = await api.get('/users/me')
      return response.data
    },
    updateMe: async (profileUpdate: UserProfileUpdate): Promise<User> => {
      const response = await api.put('/users/me', profileUpdate)
      return response.data
    },
  },
}
