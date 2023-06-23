import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import devtanuki from '../../public/devtanuki.png'

type AnimalType = {
    id: number
    name: string
}

const Animal = () => {
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

    return (
        <div>
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

export default Animal
