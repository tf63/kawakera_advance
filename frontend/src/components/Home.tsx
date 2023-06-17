import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import devtanuki from '../../public/devtanuki.png'
import ImageUploadForm from './ImageInput'

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
                    <SquareComponent key={index} image={item.image} />
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

const Home = () => {
    const [animals, setAnimals] = useState<Item[]>([])
    // const [animals, setAnimals] = useState<Item[]>([{ id: 0, image: undefined, name: 'animal' }])
    // const [items, setItems] = useState<Item[]>([])

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
            <ImageUploadForm />
            <div className="container-center">
                <PostButton />
                <RecentComponent items={animals} />
            </div>
            <GridComponent items={animals} />
        </div>
    )
}

export default Home
