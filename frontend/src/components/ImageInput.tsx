import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_ENDPOINTS } from '../api'
import { ImageAPI } from '../interfaces/interfaces'
import axios from 'axios'
const ImageUploadForm = () => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0]

        // 結果ページへの遷移
        navigate('/loading', { state: { file: file } })
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

export default ImageUploadForm
