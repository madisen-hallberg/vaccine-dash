// import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeRegionCode } from '../regionSelector/regionSlice'

// TODO: filter by activeRegion
export default function HistoricDisplay() {
    const regionCode = useSelector(activeRegionCode)

    // useEffect(() => {
    //     if (loadStatus === 'pending') {
    //         dispatch(fetchHistoricData)
    //     }
    // }, [loadStatus, dispatch])

    // console.log('Historic data', data)
    return (
        <section>
            <h2>Vaccine Over Time</h2>
            <p>{regionCode}</p>
            <p>Some chart goes here...</p>
        </section>
    )
}