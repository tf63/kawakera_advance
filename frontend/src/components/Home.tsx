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
            <img src={image} alt="Square Image" />
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

const Home = () => {
    const [animals, setAnimals] = useState<AnimalType[]>([{ id: 0, name: 'animal' }])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios('http://localhost:8000/api/animal/')
            const data = await response.data
            console.log(data)
            setAnimals(data)
        }

        fetchData()
    }, [])
    const items: Item[] = [
        { id: 1, image: devtanuki },
        { id: 2, image: devtanuki },
        { id: 3, image: devtanuki },
        { id: 4, image: devtanuki },
        { id: 5, image: devtanuki },
        { id: 6, image: devtanuki },
        { id: 7, image: devtanuki }
    ]
    return (
        <div>
            <GridComponent items={items} />
            {animals.map((item, index) => {
                return (
                    <div className="card" key={index}>
                        {item.name}
                        <img src={devtanuki} alt="devtanuki" />
                    </div>
                )
            })}
        </div>
    )
}

export default Home
