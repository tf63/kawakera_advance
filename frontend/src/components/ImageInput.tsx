import React, { useRef } from 'react'

const ImageUploadForm = () => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0]
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

export default ImageUploadForm
