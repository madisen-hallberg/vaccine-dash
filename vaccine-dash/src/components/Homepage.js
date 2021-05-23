import { useEffect, useState } from 'react'

import RegionSelector from '../features/regionSelector/RegionSelector'
import Vaccines from '../features/vaccines/Vaccines';


function Home() {
    return(
        <div className="Homepage">
            <RegionSelector />
            <Vaccines />
        </div>
    );
}

export default Home;
