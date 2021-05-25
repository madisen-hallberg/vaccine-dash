import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeRegionCode } from '../regionSelector/regionSlice'
import { fetchHistoricData, allHistoricData } from './historicSlice'

// TODO: filter by activeRegion
export default function HistoricDisplay() {
    const dispatch = useDispatch()
    const data = useSelector(allHistoricData)
    const loadStatus = useSelector(state => state.historic.status)
    const regionCode = useSelector(activeRegionCode)

    useEffect(() => {
        if (loadStatus === 'pending') {
            dispatch(fetchHistoricData(regionCode))
        }
    }, [loadStatus, dispatch])

    console.log('Historic data', data)
    return (
        <section>
            <h2>Vaccine Over Time</h2>
            <p>{regionCode}</p>
            <p>Some chart goes here...</p>
        </section>
    )
}