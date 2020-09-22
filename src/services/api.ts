import axios from 'axios'

const api = axios.create({
    baseURL:'https://blog-backend-test.herokuapp.com'
})

export default api