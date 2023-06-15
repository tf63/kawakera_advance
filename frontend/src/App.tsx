import React from 'react'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

import Home from './components/Home'
import './App.css'
import Navbar from './components/Navbar'

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* Nav */}
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    )
}

export default App
