import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

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
                投稿
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
