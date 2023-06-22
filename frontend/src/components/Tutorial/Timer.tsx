import React, { useState, useEffect } from 'react'

const Timer: React.FC = () => {
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1)
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return <div>Seconds: {seconds}</div>
}

export default Timer
