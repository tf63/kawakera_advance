import React, { useState, useEffect } from 'react'
import TriviaSlider from '../TriviaSlider'
import { Trivia } from '../../types/types'
import { TriviaAPI } from '../../interfaces/interfaces'
import { API_ENDPOINTS } from '../../api'
import axios from 'axios'
interface ProgressBarProps {
    value: number
    width: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ width, value }) => {
    const [progress, setProgress] = useState(value)

    const maxValue = 150

    useEffect(() => {
        if (progress > maxValue) {
            setProgress(maxValue)
        }
    }, [progress])

    return (
        <div className="card">
            <div className="progress-bar" style={{ width: `${width}px` }}>
                <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
            </div>
        </div>
    )
}

const TestSpace: React.FC = () => {
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

    return (
        <div>
            <TriviaSlider trivias={triviaList} />
            <ProgressBar width={500} value={100} />
        </div>
    )
}

export default TestSpace
