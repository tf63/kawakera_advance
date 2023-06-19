import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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

// const SquareComponent: React.FC<SquareProps> = ({ image }) => {
//     return (
//         <div className="square">
//             <img src={`http://localhost:8000${image}`} alt="Square Image" />
//         </div>
//     )
// }

// const GridComponent: React.FC<GridProps> = ({ items }) => {
//     return (
//         <div className="grid-container">
//             {items.map((item, index) => (
//                 <SquareComponent key={index} image={item.image} />
//             ))}
//         </div>
//     )
// }

type Feature = {
    hp: string
    atk: string
    def: string
    spatk: string
    spdef: string
    spd: string
}

const Result = () => {
    const { id } = useParams()

    // const [animals, setAnimals] = useState<Item[]>([])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await axios('http://localhost:8000/api/animal/')
    //         const data = await response.data
    //         console.log(data)
    //         setAnimals(data)
    //     }

    //     fetchData()
    // }, [])

    const [animal, setAnimal] = useState<Item>({
        id: 222,
        image: 'http://localhost:8000/media/tests/animals/devtanuki.png',
        name: 'ねこ'
    })

    const [featureData, setFeatureData] = useState<Feature>({
        hp: '並hp',
        atk: '並atk',
        def: '並def',
        spatk: '並spatk',
        spdef: '並spdef',
        spd: '並spd'
    })

    // const sample_animal = { id: 1, image: 'http://localhost:8000/media/tests/animals/devtanuki.png', name: 'ミライドン'};
    return (
        <div className="wrapper">
            <div className="result_complete">
                <h1>分類完了!!</h1>
            </div>
            <div className="column2 result">
                <div className="result_img">
                    <img src={animal.image}></img>
                </div>
                <div className="card">
                    <div className="card result_name">
                        <p>No.{animal.id}</p>
                        <h2>{animal.name}</h2>
                    </div>
                    <div className="card">
                        <div className="flex">
                            <p>type:</p>
                            <p>normal</p>
                        </div>
                        <div className="flex">
                            <p>height:</p>
                            <p>2.1m</p>
                        </div>
                        <div className="flex">
                            <p>weight:</p>
                            <p>460.0kg</p>
                        </div>
                    </div>
                    <div className="card">
                        <p>-description--description--description--description--description--description-</p>
                    </div>
                </div>
            </div>
            <div className="link_to_home">
                <Link className="link" to={'/'}>
                    Homeに戻る
                </Link>
            </div>
        </div>
    )
}

export default Result
