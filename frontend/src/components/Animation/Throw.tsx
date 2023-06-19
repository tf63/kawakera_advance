import React, { useState } from 'react'

const ThrowAnimation = () => {
    const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 })

    const handleThrowBall = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const offsetX = event.clientX - rect.left
        const offsetY = event.clientY - rect.top

        setBallPosition({ x: offsetX, y: offsetY })

        // ボールのアニメーション
        const startTime = performance.now() // アニメーション開始時刻
        const duration = 1000 // アニメーションの継続時間（ミリ秒）

        const animate = (timestamp: number) => {
            const elapsed = timestamp - startTime
            const progress = elapsed / duration

            if (progress >= 1) {
                // アニメーション終了時の処理
                return
            }

            const height = 200 // 放物線の高さ
            const x = offsetX
            const y = offsetY - height * 4 * progress * (1 - progress)

            setBallPosition({ x, y })

            // 次のフレームの描画を予約
            requestAnimationFrame(animate)
        }

        // アニメーションの開始
        requestAnimationFrame(animate)
    }

    return (
        <div
            style={{
                position: 'relative',
                width: '400px',
                height: '400px',
                backgroundColor: 'lightgray',
                overflow: 'hidden'
            }}
            onClick={handleThrowBall}
        >
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
        </div>
    )
}

export default ThrowAnimation
