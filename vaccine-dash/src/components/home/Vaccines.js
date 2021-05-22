import React, { useState, useEffect } from 'react';

const covidactnow_url  = `https://api.covidactnow.org/v2/states.json?apiKey=${process.env.REACT_APP_COVIDACTNOW_API_KEY}`

function Vaccines() {
    let [vaccines, setVaccines] = useState([])

    useEffect(() => {
        fetch(covidactnow_url)
            .then(res => res.json())
            .then(data => setVaccines(data))
            .catch(err => console.log(err))
    })

    const postItems = vaccines.map(item => <Vaccine key={item.id} {...item} />);

    return(
        <div>
            <h1>Vaccines Distributed</h1>
            {postItems}
        </div>
    );
}

function Vaccine({ state, actuals }) {
    return (
        <div>
            <h3>{state}</h3>
            <p>{actuals.vaccinesDistributed}</p>
        </div>
    )
}

export default Vaccines;