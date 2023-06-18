import React from 'react'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

import Home from './components/Home'
import Detail from './components/Detail'
import Result from './components/Result'
import './App.css'
import Navbar from './components/Navbar'

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* Nav */}
                <Route path="/" element={<Home />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/result" element={<Result />} />
            </Routes>
        </Router>
    )
}

export default App
