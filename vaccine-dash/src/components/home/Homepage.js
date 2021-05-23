import { useEffect, useState } from 'react';
import Vaccines from './Vaccines';

function Home() {
    let [vaccines, setVaccines] = useState([])
    let [activeRegion, setActiveRegion] = useState('OR')

    const API_KEY = process.env.REACT_APP_COVIDACTNOW_API_KEY
    const covidactnow_url  = `https://api.covidactnow.org/v2/states.json?apiKey=${API_KEY}`

    useEffect(() => {
        fetch(covidactnow_url)
            .then(res => res.json())
            .then(data => setVaccines(data));
    })

    return(
        <div className="Homepage">
          <input value={activeRegion} onChange={e => setActiveRegion(e.target.value)} />
          <Vaccines data={vaccines} region={activeRegion} />
        </div>
    );
}

export default Home;
