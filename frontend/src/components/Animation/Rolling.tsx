import React, { useState, useEffect } from 'react'

const BallAnimation = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [direction, setDirection] = useState({ x: 1, y: 1 })

    useEffect(() => {
        const animateBall = () => {
            setPosition((prevPosition) => ({
                x: prevPosition.x + direction.x,
                y: prevPosition.y + direction.y
            }))
        }

        const handleBoundaryCollision = () => {
            if (position.x <= 0 || position.x >= window.innerWidth - 100) {
                setDirection((prevDirection) => ({ ...prevDirection, x: -prevDirection.x }))
            }

            if (position.y <= 0 || position.y >= window.innerHeight - 100) {
                setDirection((prevDirection) => ({ ...prevDirection, y: -prevDirection.y }))
            }
        }

        const animationFrame = requestAnimationFrame(animateBall)

        return () => {
            cancelAnimationFrame(animationFrame)
        }
    }, [position, direction])

    return (
        <div
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'red'
            }}
        ></div>
    )
}

export default BallAnimation
