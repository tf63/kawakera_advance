import React from 'react'

// const API_BASE_URL = DEBUG ? 'http://localhost:8000' : 'http://localhost:8080'
const API_BASE_URL = 'http://localhost:8000'

export const API_ENDPOINTS = {
    BASE: API_BASE_URL,
    ANIMAL: `${API_BASE_URL}/api/animal/`,
    CATEGORY: `${API_BASE_URL}/api/category/`
}
