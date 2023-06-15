import React from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
    return (
        <nav style={{ height: '50px', display: 'flex', alignItems: 'center' }}>
            <ul style={{ display: 'flex', listStyle: 'none', padding: '0', margin: '0' }}>
                <li style={{ marginRight: '10px' }}>
                    <Link to="/">Home</Link>
                </li>
                <li style={{ marginRight: '10px' }}>
                    <Link to="#">About</Link>
                </li>
                <li style={{ marginRight: '10px' }}>
                    <Link to="#">Contact</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
