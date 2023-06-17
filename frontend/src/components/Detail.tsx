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

// type Feature = {
//     hp: string
//     atk: string
//     def: string
//     spatk: string
//     spdef: string
//     spd:string
// }

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
    // const [animals, setAnimals] = useState<Item[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios('http://localhost:8000/api/animal/')
            const data = await response.data
            console.log(data)
            setAnimals(data)
        }

        fetchData()
    }, [])

    // const [features,setFeatures] = useState<Feature[]>([{ hp: '並', atk: '並', def:'並' ,spatk:'並', spdef:'並', spd:'並',}])
    // const [animal, setAnimal] = useState<Item[]>([{ id: 0, image: 'http://localhost:8000/media/tests/animals/devtanuki.png', name: 'animal' }])


    const sample_animal = { id: 1, image: 'http://localhost:8000/media/tests/animals/devtanuki.png', name: 'ミライドン'};
    return (
        <div>
            <div className="card column2">
                <div>
                    <img src={sample_animal.image}></img>
                </div>
                <div className="card">
                    <p>No.{sample_animal.id}</p>
                    
                    <h2>{sample_animal.name}</h2>
                    <p>不明</p>
                </div>
            </div>
            <div className="column2">
                <div className="card">
                    <p>分類：パラドックスポケモン</p>
                    <p>電気・ドラゴン</p>
                    <p>高さ3.5m</p>
                    <p>重さ240.0kg </p>
                    <p>特性：ハドロンエンジン</p>
                </div>
                <div className="card detail_feature">
                    {/* {features.map((feature)=>{
                        return (
                            <div className="flex">
                                <p>HP</p>
                                <p>並</p>
                            </div>
                        )
                    })} */}
                    <div className="flex">
                        <p>HP</p>
                        <p>並</p>
                    </div>
                    <div className="flex">
                        <p>こうげき</p>
                        <p>並</p>
                    </div>
                    <div className="flex">
                        <p>ぼうぎょ</p>
                        <p>並</p>
                    </div>
                    <div className="flex">
                        <p>とくこう</p>
                        <p>並</p>
                    </div>
                    <div className="flex">
                        <p>とくぼう</p>
                        <p>並</p>
                    </div>
                    <div className="flex">
                        <p>すばやさ</p>
                        <p>並</p>
                    </div>
                </div>
            </div>
            <div className="card">
                <p>説明文説明文説明文説明文</p>
            </div>
            <div className="card">
                <h2>進化</h2>
                <p>進化しない</p>
            </div>
            <div className="card">
                <h2>すがた</h2>
                <p>なし</p>
            </div>
        </div>
    )
}

export default Detail
