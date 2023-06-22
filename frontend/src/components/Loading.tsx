import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { API_ENDPOINTS } from '../api'
import { ImageAPI } from '../interfaces/interfaces'
import axios from 'axios'

const Loading = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const file = location.state?.file

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const processData = async () => {
            if (file) {
                try {
                    const formData = new FormData()
                    formData.append('image', file)

                    const response = await axios.post(API_ENDPOINTS.IMAGE, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })

                    const data: ImageAPI = response.data

                    console.log('Response is ...')
                    console.log(data)

                    navigate('/result', { state: { data } }) // 結果ページへの遷移

                    setLoading(false)
                } catch (error) {
                    // エラーハンドリング
                    alert('エラー')
                    navigate('/') // 結果ページへの遷移
                }
            }
        }

        processData()
    }, [file, navigate])

    if (loading) {
        return <h1>Loading...</h1>
    } else {
        return null
    }
}

export default Loading
