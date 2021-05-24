import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectActiveRegion } from '../regionSelector/regionSlice'
import { allAvailabilityData, availabilityByState, fetchVaccineData } from './vaccineSlice'


function AvailableVaccines() {
    const dispatch = useDispatch()
    const vaccineData = useSelector(allAvailabilityData)
    // TODO: filter by region
    const region = useSelector(selectActiveRegion)

    const loadStatus = useSelector(state => state.vaccines.status)

    useEffect(() => {
        console.log(region.code)
        if (loadStatus === 'pending') {
            dispatch(fetchVaccineData(region))
        }
    }, [loadStatus, dispatch, region])

    const body = (loadStatus !== 'pending' ? vaccineData.map(datum => <Vaccine {...datum} />) : <p>Loading...</p>)

    return(
        <div>
            <h1>Vaccines Distributed</h1>
            {body}
        </div>
    );
}

function Vaccine({ id, name, store_count }) {
    return (
        <div key={id}>
            <h3>{name}</h3>
            <p>{store_count}</p>
        </div>
    )
}

export default AvailableVaccines;