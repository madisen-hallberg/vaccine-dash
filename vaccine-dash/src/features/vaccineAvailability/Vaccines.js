import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectActiveRegion } from '../regionSelector/regionSlice'
import { availabilityData, fetchAvailabilityData } from './vaccineSlice'


function AvailableVaccines() {
    const dispatch = useDispatch()

    const region = useSelector(selectActiveRegion)
    const loadStatus = useSelector(state => state.vaccines.status)
    const availability = useSelector(availabilityData)

    useEffect(() => {
        if (loadStatus === 'pending') {
            dispatch(fetchAvailabilityData(region.code))
        }
    }, [loadStatus, dispatch, region])


    const loadingMsg = <p>Loading...</p>
    const contents = (loadStatus !== 'pending') ? availability.map((dat, i) => <VaccProvider key={i} {...dat} />) : loadingMsg

    return (
        <div>
            <h1>Vaccines Distributed</h1>
            {contents}
        </div>
    )
}

function VaccProvider({ name, city, state }) {
    return (
        <article>
            <h4>{name}</h4>
            <p>{city}, {state}</p>
        </article>
    )
}

export default AvailableVaccines;