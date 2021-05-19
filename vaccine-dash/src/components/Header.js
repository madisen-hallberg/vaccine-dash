import '../style/main.css';
import About from './logos/About';
import Home from './logos/Home';

import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {

    return (
        <div className = "topnav">     
            <h1 className="bar-item left">Covid-19 Vaccination Tracker</h1>
            <div className="bar-item right">
                <Link to='/'>
                    <Home/>
                </Link>
            </div>
            <div className = "bar-item right">
                <Link to='/about'>
                  <About/>
                </Link>
            </div>
        </div>
    );
}

export default Header;