import axios from 'axios'
import { defineStore } from 'pinia'

export const authStore = defineStore('auth', {
  state: () => ({
    categories: [],
    user: null,
    userInn: null
  }),
  actions: {
    async userLogin(data) {
      const response = await axios.post('/api/auth/login', data)
      const { token, user } = response.data

      localStorage.setItem('authToken', token)
      localStorage.setItem('user', JSON.stringify(user))
    },

    async userRegister(data) {
      await axios.post('/api/auth/register', data)
  
    },

    checkAuthentication() {
      // Check if the authentication token is present in localStorage
      const authToken = localStorage.getItem('authToken')
      if (authToken) {
        // this.user = localStorage.getItem('user')
        this.user = JSON.parse(localStorage.getItem('user'))
      }

    },

    async logout() {
      await axios.post('/api/auth/logout')
      this.user = null

      // Clear authentication-related data from localStorage
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
    }
  }
})
