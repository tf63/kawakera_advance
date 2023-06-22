import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { API_ENDPOINTS } from '../api'
import { ImageAPI, TriviaAPI } from '../interfaces/interfaces'
import { Trivia } from '../types/types'
import axios from 'axios'

const Loading = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const file = location.state?.file

    const [loading, setLoading] = useState(true)

    const [triviaList, setTriviaList] = useState<Trivia[]>([])

    // トリビアの取得
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(API_ENDPOINTS.TRIVIA)
                const data: TriviaAPI = response.data
                console.log(`data: ${data}`)
                setTriviaList(data.trivia)
            } catch (error) {
                console.error('Failed to fetch trivia:', error)
            }
        }

        fetchData()
    }, [])

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

    useEffect(() => {
        console.log(triviaList)
    }, [triviaList])

    if (triviaList.length < 5) {
        return <h1>Loading...</h1>
    }

    if (!loading) {
        return <h1>Complete</h1>
    }

    return (
        <div>
            {triviaList.map((trivia, index) => {
                return (
                    <div className="card" key={index}>
                        {trivia.trivia}
                    </div>
                )
            })}
        </div>
    )
}

export default Loading
