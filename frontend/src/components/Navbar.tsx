import React from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
    return (
        <div className="container-center">
            <Link className="link" to={'/'}>
                <h1>Animal GO</h1>
            </Link>
        </div>
        // <nav className="card">
        //     <ul>
        //         <li>
        //             <Link className="link" style={{ color: 'inherit' }} to="/">
        //                 Home
        //             </Link>
        //         </li>
        //         <li>
        //             <Link className="link" style={{ color: 'inherit' }} to="#">
        //                 About
        //             </Link>
        //         </li>
        //         <li>
        //             <Link className="link" style={{ color: 'inherit' }} to="#">
        //                 Contact
        //             </Link>
        //         </li>
        //     </ul>
        // </nav>
    )
}

export default Navbar
