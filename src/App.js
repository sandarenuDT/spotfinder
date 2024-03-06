import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/NavBar'; // Correct the import path for Navbar
import Home from './components/Home'; // Import the Home component
import MyAccount from './components/MyAccount';
import Reservation from './components/Reservation';
import About from './components/About';
import Registration from './components/Registration';
import Login from './components/Login';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/home/:email" element={<Home />} />
                    <Route path="/my-account/:email" element={<MyAccount />} />
                    <Route path="/reservation/:email" element={<Reservation />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;