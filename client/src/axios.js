import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URI
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  
    let dataLocalStorage = window.localStorage.getItem('persist:user')

    if (dataLocalStorage && typeof dataLocalStorage === 'string') {
      dataLocalStorage = JSON.parse(dataLocalStorage)
      const token = JSON.parse(dataLocalStorage.token)

      config.headers = {Authorization: `Bearer ${token}`}
      return config
    }

    return config
  }, function (error) {
    // Do something with request error
    console.log('hello')
    return Promise.reject(error.response.data);
})

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.response
})

export default instance