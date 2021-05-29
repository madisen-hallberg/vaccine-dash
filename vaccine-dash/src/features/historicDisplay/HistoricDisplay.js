import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeRegionCode } from '../regionSelector/regionSlice'
import { fetchHistoricData, selectVaccineData } from './historicSlice'

import CircularProgress from '@material-ui/core/CircularProgress'

// TODO: filter by activeRegion
export default function HistoricDisplay() {
    const dispatch = useDispatch()
    const loadStatus = useSelector(state => state.historic.status)
    const regionCode = useSelector(activeRegionCode)
    const vaccTimeseries = useSelector(selectVaccineData)

    useEffect(() => {
        if (loadStatus === 'pending') {
            dispatch(fetchHistoricData(regionCode))
        }
    }, [loadStatus, dispatch, regionCode])
    
    if (vaccTimeseries === undefined) return <CircularProgress />

    return (
        <section>
            <h2>Vaccine Over Time</h2>
            {loadStatus !== 'succeeded' && <CircularProgress />}
            {loadStatus === 'succeeded' && <p>Data Loaded</p>}
        </section>
    )
}
