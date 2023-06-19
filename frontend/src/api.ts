const DEBUG = process.env.DEBUG === '1'

const API_BASE_URL = DEBUG ? 'http://localhost:8000' : 'http://localhost:8080'

export const API_ENDPOINTS = {
    ANIMALS: `${API_BASE_URL}/users`
}
