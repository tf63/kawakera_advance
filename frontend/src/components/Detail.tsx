import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import devtanuki from '../../public/devtanuki.png'

type AnimalType = {
    id: number
    name: string
}

type Item = {
    id: number
    image: string
    name: string
}

type SquareProps = {
    image: string
}

type GridProps = {
    items: Item[]
}

const SquareComponent: React.FC<SquareProps> = ({ image }) => {
    return (
        <div className="square">
            <img src={`http://localhost:8000${image}`} alt="Square Image" />
        </div>
    )
}

const GridComponent: React.FC<GridProps> = ({ items }) => {
    return (
        <div className="grid-container">
            {items.map((item, index) => (
                <SquareComponent key={index} image={item.image} />
            ))}
        </div>
    )
}

const Detail = () => {
    const [animals, setAnimals] = useState<Item[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios('http://localhost:8000/api/animal/')
            const data = await response.data
            console.log(data)
            setAnimals(data)
        }

        fetchData()
    }, [])

    return (
        <div>
            <div className='card column2'>
                <div><img src='http://localhost:8000/media/animals/devtanuki.png'></img></div>
                <div className='card'>
                    <p>No.1008</p>
                    <h2>ミライドン</h2>
                    <p>不明</p>
                </div>
            </div>
            <div className='column2'>
                <div className='card'>
                    <p>分類：パラドックスポケモン</p>
                    <p>電気・ドラゴン</p>
                    <p>高さ3.5m</p>
                    <p>重さ240.0kg </p>
                    <p>特性：ハドロンエンジン</p>
                </div>
                <div className='card detail_feature'>
                    <div className='flex'>
                        <p>HP</p>
                        <p>並</p>
                    </div>
                    <ul>
                        <li>
                            <span>HP</span>普通
                        </li>
                        <li>こうげき</li>
                        <li>ぼうぎょ</li>
                        <li>とくこう</li>
                        <li>とくぼう</li>
                        <li>すばやさ</li>
                    </ul>
                </div>
            </div>
            <div className='card'>
                <p>説明文説明文説明文説明文</p>
            </div>
            <div className='card'>
                <h2>進化</h2>
                <p>進化しない</p>
            </div>
            <div className='card'>
                <h2>すがた</h2>
                <p>なし</p>
            </div>
            
        </div>
    )
}

export default Detail
