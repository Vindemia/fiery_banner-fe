import api from './axiosInstance'

const register = async (data) => {
    const response = await api.post('/register', data)
    return response.data
}

const login = async (data) => {
    const response = await api.post('/login', data)
    return response.data
}

export { register, login }