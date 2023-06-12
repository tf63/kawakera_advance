import React from 'react'
import Card from './Card'
import LinkCard from './LinkCard'

function Home() {
    return (
        <div>
            <LinkCard content="About" link="/about" color="Green" />
            <LinkCard content="Profile" link="/profile" color="Green" />
            <LinkCard content="Select" link="/select" color="Green" />
            <Card content="Card" />
            <Card content="Card" />
            <Card content="Card" />
            <Card content="Card" />
        </div>
    )
}

export default Home
