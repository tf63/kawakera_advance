import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

const Home = () => {
    const [name, setName] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios("http://localhost:8000/api/animal/")
            const data = await response.data
            console.log(data[0])
            setName(data[0].name)
        }

        fetchData()
    }, [])

    useEffect(() => {
        console.log(name)
    }, name)
    return (
        <div>
            <div className="card">
                {name}
            </div>
        </div>
    )
}

export default Home
