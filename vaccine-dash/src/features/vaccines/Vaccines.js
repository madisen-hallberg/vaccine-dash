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

export default Vaccines;