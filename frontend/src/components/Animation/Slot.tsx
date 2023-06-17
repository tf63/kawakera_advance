import React, { useState, useEffect } from 'react'

interface SlotProps {
    options: string[]
}

const Slot: React.FC<SlotProps> = ({ options }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isSpinning, setIsSpinning] = useState(false)

    useEffect(() => {
        if (!isSpinning) return

        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * options.length)
            setSelectedIndex(randomIndex)
        }, 100) // スロットが回転する速度（ミリ秒）

        return () => {
            clearInterval(interval)
        }
    }, [isSpinning, options.length])

    const spin = () => {
        setIsSpinning(true)

        setTimeout(() => {
            setIsSpinning(false)
        }, 2000) // スロットが停止するまでの時間（ミリ秒）
    }

    return (
        <div className="slot">
            <div className={`slot-inner ${isSpinning ? 'spinning' : ''}`}>
                {options.map((option, index) => (
                    <div
                        key={index}
                        className={`slot-option ${isSpinning && index === selectedIndex ? 'selected' : ''}`}
                    >
                        {option}
                    </div>
                ))}
            </div>
            <button onClick={spin} disabled={isSpinning}>
                {isSpinning ? 'Spinning...' : 'Spin'}
            </button>
        </div>
    )
}

const SlotMachine: React.FC = () => {
    const options = ['Cherry', 'Bell', 'Seven', 'Diamond', 'Bar']

    return (
        <div className="slot-machine">
            <h1>Slot Machine</h1>
            <div className="slots-container">
                <Slot options={options} />
                <Slot options={options} />
                <Slot options={options} />
            </div>
        </div>
    )
}

export default SlotMachine
