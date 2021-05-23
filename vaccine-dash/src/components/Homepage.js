import { useEffect, useState } from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'

import Vaccines from '../features/vaccines/Vaccines';

const regions = [ "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "AS", "GU", "MH", "FM", "MP", "PW", "PR", "VI" ]

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
            <FormControl>
                <InputLabel id='region-select-label'>Choose State</InputLabel>
                <Select
                    labelId='region-select-label'
                    id='region-select'
                    value={activeRegion}
                    onChange={e => setActiveRegion(e.target.value)}
                >
                    {regions.map(r => <MenuItem value={r}>{r}</MenuItem>)}
                </Select>
                <Vaccines data={vaccines} region={activeRegion} />
            </FormControl>
        </div>
    );
}

export default Home;
