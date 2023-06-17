import React, { useState, useEffect } from 'react'

const BoxAnimation = () => {
    const [ballVisible, setBallVisible] = useState(false)
    const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const showBall = () => {
            setBallVisible(true)
        }

        const moveBall = () => {
            setBallPosition((prevPosition) => ({
                x: prevPosition.x + 5,
                y: prevPosition.y + 5
            }))
        }

        if (ballVisible) {
            const timeout = setTimeout(moveBall, 1000)

            return () => {
                clearTimeout(timeout)
            }
        } else {
            const timeout = setTimeout(showBall, 2000)

            return () => {
                clearTimeout(timeout)
            }
        }
    }, [ballVisible])

    return (
        <div
            style={{
                position: 'relative',
                width: '200px',
                height: '200px',
                backgroundColor: 'lightgray',
                overflow: 'hidden'
            }}
        >
            {ballVisible && (
                <div
                    style={{
                        position: 'absolute',
                        left: ballPosition.x,
                        top: ballPosition.y,
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: 'red'
                    }}
                ></div>
            )}
        </div>
    )
}

export default BoxAnimation
