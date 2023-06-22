import React, { useState, useEffect } from 'react'

interface ProgressBarProps {
    value: number
    width: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ width, value }) => {
    const maxValue = 130
    const [progress, setProgress] = useState((value / maxValue) * 100)

    useEffect(() => {
        if (progress > 100) {
            setProgress(100)
        }
    }, [progress])

    return (
        // <div className="card">
        <div className="progress-bar" style={{ width: `${width}px` }}>
            <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
        </div>
        // </div>
    )
}

export default ProgressBar
