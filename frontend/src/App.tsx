import React from 'react'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

import Home from './components/Home'
import Detail from './components/Detail'
import './App.css'

function App() {
    return (
        <Router>
            <Routes>
                {/* Nav */}
                <Route path="/" element={<Home />} />
                <Route path="/detail" element={<Detail />} />
            </Routes>
        </Router>
    )
}

export default App
