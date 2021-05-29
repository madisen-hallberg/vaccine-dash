import madisen from '../../assets/madisen.jpg';
import geoff from '../../assets/geoff.png';
import morgan from '../../assets/morgan.jpg';

import Teammate from './Teammate';

import { useState } from 'react'


const Teammates = () => {
    const[teammates] = useState([
        {
            id: 1,
            name: 'Madisen Hallberg',
            img: madisen,
            bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat',
        },
        {
            id: 2,
            name: 'Geoff Corvera',
            img: geoff,
            bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat',
        },
        {
            id: 3,
            name: 'Morgan Courvoisier',
            img: morgan,
            bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat',
        }
    ])

    return (
        <div>
            <div className ='container'>
                {teammates.map((teammate) => (
                <Teammate key={teammate.id} teammate={teammate} />
                ))}
            </div>
        </div>
    )
}

export default Teammates