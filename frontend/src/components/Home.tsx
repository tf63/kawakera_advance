import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import devtanuki from '../../public/devtanuki.png'
import devrabbit from '../../public/devrabbit.png'
import devdog from '../../public/devdog.png'
import devhamu from '../../public/devhamu.png'
import devpenpen from '../../public/devpenpen.png'

import ImageUploadForm from './ImageInput'
import ImageSlider from './ImageSlider'

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
        <div className="card square container-center">
            <img src={`http://localhost:8000${image}`} alt="Square Image" />
        </div>
    )
}

const GridComponent: React.FC<GridProps> = ({ items }) => {
    return (
        <div className="container-center">
            <div className="grid-box">
                {items.map((item, index) => (
                    <div className="card square">
                        <div className="container-center">
                            <img
                                src={`http://localhost:8000${item.image}`}
                                style={{ width: '180px' }}
                                alt="Square Image"
                            />
                        </div>
                        <div className="container-center">
                            <p>{item.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const PostButton = () => {
    return <div className="post-button container-center card circle">投稿ボタン</div>
}

const RecentComponent: React.FC<GridProps> = ({ items }) => {
    return (
        <div className="container-center">
            <div className="card">
                <img src={`http://localhost:8000${items[1].image}`} alt="Square Image" />
            </div>
        </div>
    )
}

const Line = () => {
    return <div className="line"></div>
}

const Home = () => {
    const [animals, setAnimals] = useState<Item[]>([])
    // const [animals, setAnimals] = useState<Item[]>([{ id: 0, image: undefined, name: 'animal' }])
    // const [items, setItems] = useState<Item[]>([])
    const test_slide_images = [devtanuki, devrabbit, devdog, devhamu, devpenpen]
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios('http://localhost:8000/api/animal/')
            const data = await response.data
            console.log(data)
            setAnimals(data)
        }

        fetchData()
    }, [])

    if (animals.length == 0) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className="container-center">
                <h1>Animal GO</h1>
            </div>
            <ImageUploadForm />
            <ImageSlider images={test_slide_images} />
            <div className="container-center">
                <div>でぶモン図鑑</div>
                <div className="line"> </div>
            </div>
            <GridComponent items={animals} />
        </div>
    )
}

export default Home
