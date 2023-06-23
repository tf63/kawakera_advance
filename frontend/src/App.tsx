import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './components/Home'
import Detail from './components/Detail'
import Result from './components/Result'
import './App.css'
import Navbar from './components/Navbar'
import Loading from './components/Loading'

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
                <Route path="/loading" element={<Loading />} />
            </Routes>
        </Router>
    )
}

export default App
