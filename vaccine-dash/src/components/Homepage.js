import { useEffect, useState } from 'react'

import RegionSelector from '../features/regionSelector/RegionSelector'
import Vaccines from '../features/vaccines/Vaccines';


function Home() {
    let [vaccines, setVaccines] = useState([])

    const API_KEY = process.env.REACT_APP_COVIDACTNOW_API_KEY
    const covidactnow_url  = `https://api.covidactnow.org/v2/states.json?apiKey=${API_KEY}`

    useEffect(() => {
        fetch(covidactnow_url)
            .then(res => res.json())
            .then(data => setVaccines(data));
    }, [])

    return(
        <div className="Homepage">
            <RegionSelector />
            <Vaccines data={vaccines} />
        </div>
    );
}

export default Home;
