import React, { useEffect, useState } from 'react';

const covidactnow_url  = `https://api.covidactnow.org/v2/states.json?apiKey=${process.env.REACT_APP_COVIDACTNOW_API_KEY}`
function Vaccines() {
    let [vaccines, setVaccines] = useState([])

    useEffect(() => {
        fetch(covidactnow_url)
            .then(res => res.json())
            .then(data => setVaccines(data));
    })

    const postItems = vaccines.map(item => (
        <div key={item.id}>
            <h3>{item.state}</h3>
            <p>{item.actuals.vaccinesDistributed}</p>
        </div>
    ));

    return(
        <div>
            <h1>Vaccines Distributed</h1>
            {postItems}
        </div>
    );
}

export default Vaccines;