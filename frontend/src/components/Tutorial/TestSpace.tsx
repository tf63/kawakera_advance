import React, { useState, useEffect } from 'react'

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
    return (
        <div>
            <ProgressBar value={10} width={500} />
            <ProgressBar value={30} width={500} />
            <ProgressBar value={50} width={500} />
            <ProgressBar value={100} width={500} />
            <ProgressBar value={300} width={500} />
        </div>
    )
}

export default TestSpace
