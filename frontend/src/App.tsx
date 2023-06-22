import React from 'react'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

import Home from './components/Home'
import Detail from './components/Detail'
import Result from './components/Result'
import './App.css'
import Navbar from './components/Navbar'
import BallAnimation from './components/Animation/Rolling'
import BoxAnimation from './components/Animation/Box'
import ThrowAnimation from './components/Animation/Throw'
import SlotMachine from './components/Animation/Slot'

import ScrollTop from './components/ScrollTop'
import TestSpace from './components/Tutorial/TestSpace'

function App() {
    return (
        <Router>
            <ScrollTop />
            <Navbar />
            {/* <Navbar /> */}
            <Routes>
                {/* Nav */}
                <Route path="/" element={<Home />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/result" element={<Result />} />
                <Route path="/testspace" element={<TestSpace />} />
                <Route path="/rolling" element={<BallAnimation />} />
                <Route path="/box" element={<BoxAnimation />} />
                <Route path="/throw" element={<ThrowAnimation />} />
                <Route path="/slot" element={<SlotMachine />} />
            </Routes>
        </Router>
    )
}

export default App
