import '../style/main.css';
import About from './logos/About';
import Home from './logos/Home';

import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory, NavLink } from 'react-router-dom';

const Header = props => {
    const currentRoute = useHistory().location.pathname.toLowerCase();

    return (
        <div className = "topnav">     
            <h1 className="bar-item left">Covid-19 Vaccination Tracker</h1>
            <div className="bar-item right">
                <NavLink activeClassName="active" className={"bar-item right"} to='/home'>
                    <Home/>
                </NavLink>
            </div>
            <div className = "bar-item right">
                <NavLink activeClassName ="active" className={"bar-item right"} to='/about'>
                  <About/>
                </NavLink>
            </div>
        </div>
    );
}

export default Header;