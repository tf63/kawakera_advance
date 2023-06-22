import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_ENDPOINTS } from '../api'

const Loading = () => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0]
        if (file) {
            console.log('file input!', file)
            // ここで画像ファイルの処理を行います

            try {
                const response = await fetch(API_ENDPOINTS.IMAGE, {
                    method: 'POST',
                    body: file
                })
                console.log(response)

                // // 結果ページへの遷移
                // navigate('/result')
            } catch (error) {
                // エラーハンドリング
                alert('エラー')
            }

            // API_ENDPOINTS.IMAGE
        }
        // 画像ファイルの処理
    }

    return (
        <div>
            <div className="card-green" onClick={handleButtonClick}>
                投稿ボタン
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
            />
        </div>
    )
}

export default Loading
