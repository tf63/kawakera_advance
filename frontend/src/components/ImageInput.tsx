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
        if (file) {
            console.log('file input!', file)
            // ここで画像ファイルの処理を行います

            try {
                const formData = new FormData()
                formData.append('image', file) // フォームデータに画像ファイルを追加する

                // const response = await fetch(API_ENDPOINTS.IMAGE, {
                //     method: 'POST',
                //     body: formData
                // })
                const response = await axios.post(API_ENDPOINTS.IMAGE, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                const data: ImageAPI = response.data

                console.log('Response is ...')
                console.log(data)

                // 結果ページへの遷移
                navigate('/result', { state: { data: data } })
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

export default ImageUploadForm
