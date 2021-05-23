import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import { selectActiveRegion } from '../regionSelector/regionSlice'
import { allVaccineData, fetchVaccineData } from './vaccineSlice'


function Vaccines() {
    const dispatch = useDispatch()
    // TODO: filter by region
    // const region = useSelector(selectActiveRegion)
    const vaccineData = useSelector(allVaccineData)

    const loadStatus = useSelector(state => state.vaccines.status)

    useEffect(() => {
        if (loadStatus === 'pending') {
            dispatch(fetchVaccineData())
        }
    }, [loadStatus, dispatch])

    return(
        <div>
            <h1>Vaccines Distributed</h1>
            {vaccineData.map(datum => <Vaccine {...datum} />)}
        </div>
    );
}

function Vaccine({ id, state, actuals }) {
    return (
        <div key={id}>
            <h3>{state}</h3>
            <p>{actuals.vaccinesDistributed}</p>
        </div>
    )
}

export default Vaccines;