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

    // useEffect(() => {
    //     setItems
    // }, animals)

    // const items: Item[] = [
    //     { id: 1, image: devtanuki },
    //     { id: 2, image: devtanuki },
    //     { id: 3, image: devtanuki },
    //     { id: 4, image: devtanuki },
    //     { id: 5, image: devtanuki },
    //     { id: 6, image: devtanuki },
    //     { id: 7, image: devtanuki }
    // ]
    return (
        <div>
            <GridComponent items={animals} />
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
