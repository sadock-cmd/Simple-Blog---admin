import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_URL_PATH

axios.defaults.withCredentials = true

// Request interceptor
axios.interceptors.request.use((config) => {

  const authToken = localStorage.getItem('authToken')

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`
  }

  return config
})

// Response interceptor (optional)
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally if needed
    return Promise.reject(error)
  }
)

export default axios
