import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

type Animal = {
    id: number
    name: string
}

const Home = () => {
    const [animals, setAnimals] = useState<Animal[]>([{ id: 0, name: 'animal' }])

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
            {animals.map((item, index) => {
                return (
                    <div className="card" key={index}>
                        {item.name}
                    </div>
                )
            })}
        </div>
    )
}

export default Home
