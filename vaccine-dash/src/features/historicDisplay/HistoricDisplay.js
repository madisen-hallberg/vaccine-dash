import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeRegionCode } from '../regionSelector/regionSlice'
import { fetchHistoricData, timeSeriesData, riskLevelsTimeseries } from './historicSlice'

// TODO: filter by activeRegion
export default function HistoricDisplay() {
    const dispatch = useDispatch()
    const loadStatus = useSelector(state => state.historic.status)
    const regionCode = useSelector(activeRegionCode)
    const riskLevels = useSelector(riskLevelsTimeseries)

    useEffect(() => {
        if (loadStatus === 'pending') {
            dispatch(fetchHistoricData(regionCode))
        }
    }, [loadStatus, dispatch, regionCode])

    console.log('Risk level timeseries', riskLevels)
    const dates = riskLevels.map(d => new Date(d.date))
    const overalRiskLevel = riskLevels .map(d => d.overall)

    return (
        <section>
            <h2>Vaccine Over Time</h2>
        </section>
    )
}
