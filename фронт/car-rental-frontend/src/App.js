import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header'; // Импортируем компонент Header
import Main from './components/Main';
import Car from './components/Car';
import Details from './components/Details';
import Login from './components/Login';
import Register from './components/Register';
import Add from './components/Add'
import './index.css';

function App() {
    return (

        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/car" element={<Car />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="/header" element={<Header/>}/>
                <Route path="/add" element={<Add/>}/>
            </Routes>
        </Router>
    );
}

export default App;
