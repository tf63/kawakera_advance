import React from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
    return (
        <nav className="card">
            <ul>
                <li>
                    <Link className="link" style={{ color: 'inherit' }} to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link className="link" style={{ color: 'inherit' }} to="#">
                        About
                    </Link>
                </li>
                <li>
                    <Link className="link" style={{ color: 'inherit' }} to="#">
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
