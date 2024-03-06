import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const { email } = useParams(); 
    const [userData, setUserData] = useState("sample@gmail.com");

    useEffect(() => {
        // Check if user data is already stored in local storage
        const storedUserData = localStorage.getItem('userData');

        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        } else {
            axios.get('http://localhost:8070/User/users')
                .then((response) => {
                    const users = response.data;
                    const user = users.find((user) => user.email === email);

                    if (user) {
                        setUserData(user);
                        // Store user data in local storage
                        localStorage.setItem('userData', JSON.stringify(user));
                    } else {
                        console.error('User not found');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [email]);

    return (
         
        <div>
            <div style={{ height: '80hv' }}>
                <div className="background-image">
                    <div style={{ textAlign: 'right' }}>
                        <h1 style={{ fontSize: '30px', fontWeight: '900', fontFamily: 'Cursive', lineHeight: '2' }}>FIND YOUR PARKING</h1>
                        <h1 style={{ fontSize: '30px', fontWeight: '900', fontFamily: 'Cursive', lineHeight: '2' }}>
                            SPOT....
                        </h1>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <h1 style={{ fontSize: '25px', marginLeft: '10px', fontWeight: '800' }}>PARK EASY</h1>
                </div>
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: 1 }}>
                        <div className="vertical-rectangle"></div>
                    </div>
                    <div style={{ flex: 20 }}>
                        <h1 style={{ fontSize: '15px', marginLeft: '10px', fontWeight: '800' }}>Say goodbye to the hassle of finding</h1>
                        <h1 style={{ fontSize: '15px', marginLeft: '10px', fontWeight: '800' }}>parking spots and hello to stress-free</h1>
                        <h1 style={{ fontSize: '15px', marginLeft: '10px', fontWeight: '800' }}>parking</h1>
                    </div>
                    <div style={{ flex: 5, padding: '20px' }}>
                        <Link to={`/reservation/${userData.email}`}>
                            <button className="start-button">Get Started</button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;