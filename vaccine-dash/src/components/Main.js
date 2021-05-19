import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './home/Homepage'
import About from './about/Aboutpage'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component ={Home}/>
            <Route path = '/about' component = {About}/>
        </Switch>
    </main>
)

export default Main